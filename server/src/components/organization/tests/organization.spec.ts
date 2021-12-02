import mongoose, { Document, Mongoose } from "mongoose";
import { connection } from "../../../database/connection";
import { container } from "../../../ioc/container.ioc";
import { TYPES } from "../../../ioc/types.ioc";
import { OrganizationModel } from "../../../database/models/organization.model";
import { CityModel } from "../../../database/models/city.model";
import { OrganizationUsecase } from "../usecases/organization.usecase";

describe("Product component test", () => {
    const organizationUsecase = container.get<OrganizationUsecase>(
        TYPES.OrganizationUsecase
    );
    let cityId: string;
    beforeAll(async () => {
        await connection();

        const organizationId = new mongoose.Types.ObjectId();

        const city = await CityModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: "Алушта",
            organizations: [organizationId]
        });
        await city.save();

        cityId = city._id;
        const organization = await OrganizationModel.create({
            _id: organizationId,
            id: "someuuid",
            city: cityId,
            address: {
                longitude: 34.51,
                latitude: 52.561,
                street: "Ленина",
                home: 5
            },
            phone: "+79876543211"
        });
        await organization.save();
    });

    afterAll(async () => {
        try {
            await OrganizationModel.deleteMany();
            await CityModel.deleteMany();
            await mongoose.connection.close();
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase should return collection of organiztions", async () => {
        try {
            const result = await organizationUsecase.getAll(cityId);

            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        address: "Ленина, 5",
                        city: "Алушта"
                    })
                ])
            );
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });
});
