import mongoose, { Document } from "mongoose";

import { ICityRepository } from "../repositories/interface.repository";
import { container } from "../../../ioc/container.ioc";
import { TYPES } from "../../../ioc/types.ioc";
import { connection } from "../../../database/connection";
import { CityModel } from "../../../database/models/city.model";
import { OrganizationModel } from "../../../database/models/organization.model";
import { CityUsecase } from "../usecases/city.usecase";

describe("city component test", () => {
    const cityRepository = container.get<ICityRepository>(TYPES.CityRepository);
    const cityUsecase = container.get<CityUsecase>(TYPES.CityUsecase);

    let city: Document;

    beforeAll(async () => {
        try {
            await connection();

            const cityId = new mongoose.Types.ObjectId();

            // city for test next comment
            const city2 = await CityModel.create({
                _id: new mongoose.Types.ObjectId(),
                name: "Алушта"
            });

            city2.save();

            /*  create organizations for test filter cities,
                whos not contain organizationsё
            */
            const refs = [];
            for (let i = 0; i < 3; i++) {
                const organization = await OrganizationModel.create({
                    id: "someid" + i,
                    city: cityId,
                    address: {
                        longitude: 34.51,
                        latitude: 52.561,
                        street: "Ленина",
                        home: i + 1 * 5
                    },
                    phone: "+79876543211"
                });

                await organization.save();
                refs.push(organization._id);
            }

            city = await CityModel.create({
                _id: cityId,
                name: "Симферополь",
                organizations: refs
            });
            city.save();
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
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

    it("city repository should return list of cities", async () => {
        try {
            const result = await cityRepository.getAll();

            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ name: "Симферополь" })
                ])
            );
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });

    it("city usecase should return array with one element", async () => {
        try {
            const result = await cityUsecase.getAll();

            expect(result.length).toBe(1);
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });
});
