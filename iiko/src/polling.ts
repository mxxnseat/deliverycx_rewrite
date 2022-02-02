import { config } from "dotenv";
config({
    path: __dirname + "/../.development.env"
});
process.chdir(`${__dirname}/../..`);
import axios from "axios";
import { Types, Document } from "mongoose";

import { GeoCoder } from "./lib/geocoder";

//models
import { OrganizationModel } from "./database/models/organization.model";
import { CityModel } from "./database/models/city.model";
import { connection } from "./database/connection";
import { CategoryModel } from "./database/models/category.model";
import { ProductModel } from "./database/models/product.model";
import { DownloadImage } from "./lib/download";

const _axios = axios.create({
    baseURL: process.env.SERVICE_URL
});

const geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
const downloader = new DownloadImage();

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
                                        phone: organization.contact.phone,
                                        workTime:
                                            organization.workTime.split(";")[0]
                                    },
                                    { new: true, upsert: true }
                                );

                            console.log(`organization: ${organization.id}\n`);
                            console.log(
                                `organizaotionName: ${street}, ${home}`
                            );
                            console.log(
                                `--------------------------------------------------------\n`
                            );

                            return {
                                uuid: organization.id,
                                _id: organizationModel._id
                            };
                        }
                    })
                )
            ).filter((e) => Boolean);
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

                        // console.log(data.groups);

                        await CategoryModel.deleteMany({ organization: _id });
                        const categories = await Promise.all(
                            data.groups.map(async (category) => {
                                if (category.description !== "HIDDEN") {
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
                                                          category.images
                                                              .length - 1
                                                      ].imageUrl
                                                    : "",
                                                order: category.order,
                                                organization: _id
                                            }
                                        },
                                        { upsert: true }
                                    );
                                }
                            })
                        );

                        const favoriteCategory =
                            await CategoryModel.findOneAndUpdate(
                                {
                                    name: "Избранное",
                                    organization: _id
                                },
                                {
                                    $setOnInsert: {
                                        organization: _id,
                                        name: "Избранное",
                                        order: categories.length,
                                        image: "/static/shop/favorite.png"
                                    }
                                },
                                { upsert: true, new: true }
                            );

                        await Promise.all(
                            data.products.map(async (product) => {
                                const categoryId = await CategoryModel.findOne({
                                    id: product.parentGroup
                                });

                                const image = product.images[
                                    product.images.length - 1
                                ]
                                    ? product.images[product.images.length - 1]
                                          .imageUrl
                                    : "";
                                await ProductModel.updateOne(
                                    {
                                        id: product.id
                                    },
                                    {
                                        image: await downloader.download(image),
                                        organization: _id,
                                        name: product.name,
                                        description: product.description,
                                        additionalInfo: product.additionalInfo,
                                        price: product.price,
                                        tags: product.tags,
                                        weight: product.weight,
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
        console.log("start");

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
    console.log("success connect");
    await iikoService.polling();

    process.exit(1);
});
