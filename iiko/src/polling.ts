import { config } from "dotenv";
config({
    path: __dirname + "/../.env"
});

import axios from "axios";
import { Types, Document } from "mongoose";

import { GeoCoder } from "./lib/geocoder";

//models
import { OrganizationModel } from "./database/models/organization.model";
import { CityModel } from "./database/models/city.model";
import { connection } from "./database/connection";
import { CategoryModel } from "./database/models/category.model";
import { ProductModel } from "./database/models/product.model";

const _axios = axios.create({
    baseURL: process.env.SERVICE_URL
});

const geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);

class IikoService {
    public token: string;
    public organizations: Array<{ uuid: UniqueId; _id: Types.ObjectId }>;

    constructor(
        private readonly login: string,
        private readonly password: string
    ) {}

    private async getToken(): Promise<void> {
        try {
            const { data: token } = await _axios.get<Token>(
                `/api/0/auth/access_token?user_id=${this.login}&user_secret=${this.password}`
            );

            this.token = token;
        } catch (e) {
            console.log(e);
        }
    }

    private async getAddresses(): Promise<void> {
        try {
            const { data: organizations } = await _axios.get<
                Array<IOrganization>
            >(
                `/api/0/organization/list?access_token=${this.token}&request_timeout=00%3A01%3A00`
            );

            this.organizations = (
                await Promise.all(
                    organizations.map(async (organization) => {
                        if (!organization.description.match("HIDDEN")) {
                            const splitAddress = organization.address.match(
                                /^(?<city>.*?),(?<address>.+)/
                            ).groups;
                            console.log(splitAddress);
                            const organization_id = new Types.ObjectId();

                            const { street, home } = splitAddress.address
                                .trim()
                                .replace(",", "")
                                .match(/(?<street>.*?)(?<home>\d{1}.*)/).groups;

                            const city = await CityModel.findOneAndUpdate(
                                {
                                    name: {
                                        $regex: splitAddress.city,
                                        $options: "i"
                                    }
                                },
                                {
                                    $setOnInsert: {
                                        name:
                                            splitAddress.city[0].toUpperCase() +
                                            splitAddress.city.slice(1)
                                    },
                                    $addToSet: {
                                        organizations: organization_id
                                    }
                                },
                                { new: true, upsert: true }
                            );

                            const { position } = await geoCoder.resolve(
                                organization.address
                            );

                            const organizationModel =
                                await OrganizationModel.findOneAndUpdate(
                                    { id: organization.id },
                                    {
                                        $setOnInsert: {
                                            _id: organization_id,
                                            id: organization.id,
                                            city: city._id
                                        },
                                        address: {
                                            street: street.trim(),
                                            home: home.trim(),
                                            longitude: position[0],
                                            latitude: position[1]
                                        },
                                        phone: organization.contact.phone
                                    },
                                    { new: true, upsert: true }
                                );

                            return {
                                uuid: organization.id,
                                _id: organizationModel._id
                            };
                        }
                    })
                )
            ).filter((e) => e !== undefined);
        } catch (e) {
            console.log(e);
        }
    }

    private async getNomenclature(): Promise<void> {
        try {
            await Promise.all(
                this.organizations.map(async ({ uuid, _id }) => {
                    const { data } = await _axios.get<{
                        groups: Array<ICategory>;
                        products: Array<IProduct>;
                        revision: number;
                    }>(
                        `/api/0/nomenclature/${uuid}?access_token=${this.token}`
                    );

                    const organization = await OrganizationModel.findById(_id);

                    if (organization.revision !== data.revision) {
                        await OrganizationModel.findByIdAndUpdate(
                            _id,
                            {
                                revision: data.revision
                            },
                            { upsert: true }
                        );

                        await Promise.all(
                            data.groups.map(async (category) => {
                                await CategoryModel.updateOne(
                                    {
                                        id: category.id
                                    },
                                    {
                                        $setOnInsert: {
                                            id: category.id,
                                            name: category.name,
                                            image: category.images[
                                                category.images.length - 1
                                            ]
                                                ? category.images[
                                                      category.images.length - 1
                                                  ].imageUrl
                                                : "",
                                            order: category.order,
                                            organization: _id
                                        }
                                    },
                                    { upsert: true }
                                );
                            })
                        );

                        await Promise.all(
                            data.products.map(async (product) => {
                                const categoryId = await CategoryModel.findOne({
                                    id: product.parentGroup
                                });
                                await ProductModel.updateOne(
                                    {
                                        id: product.id
                                    },
                                    {
                                        image: product.images[
                                            product.images.length - 1
                                        ]
                                            ? product.images[
                                                  product.images.length - 1
                                              ].imageUrl
                                            : "",
                                        organization: _id,
                                        name: product.name,
                                        description: product.description,
                                        additionalInfo: product.additionalInfo,
                                        price: product.price,
                                        weight: product.price,
                                        measureUnit: product.measureUnit,
                                        category: categoryId,
                                        id: product.id
                                    },
                                    { upsert: true }
                                );
                            })
                        );
                    }
                })
            );
        } catch (e) {
            console.log(e);
        }
    }

    public async polling() {
        await this.getToken();
        await this.getAddresses();
        await this.getNomenclature();

        console.log("end");
    }
}

const iikoService = new IikoService(
    process.env.SERVICE_LOGIN,
    process.env.SERVICE_PASSWORD
);

connection().then(async () => {
    await iikoService.polling();

    process.exit(1);
});
