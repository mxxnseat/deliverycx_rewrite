import mongoose from "mongoose";
import { TYPES } from "../../../ioc/types.ioc";
import { container } from "../../../ioc/container.ioc";
import { ICategoryRepository } from "../repositories/interface.repository";
import { connection } from "../../../database/connection";
import { CategoryModel } from "../../../database/models/category.model";

describe("Category component test", () => {
    const categoryRepository = container.get<ICategoryRepository>(
        TYPES.CategoryRepository
    );
    let orgId = beforeAll(async () => {
        await connection();

        orgId = new mongoose.Types.ObjectId();

        for (let i = 0; i < 5; i++) {
            await CategoryModel.create({
                id: "someid" + i + 1,
                organization: orgId,
                name: "somecategory" + i,
                image: "imagepath/" + i
            });
        }
    });

    afterAll(async () => {
        try {
            await CategoryModel.deleteMany();
            await mongoose.connection.close();
        } catch (e) {
            console.log(e);
        }
    });

    it("repository should get all categories", async () => {
        try {
            const result = await categoryRepository.getAll(orgId);
            expect(result[0]).toEqual(
                expect.objectContaining({ name: "somecategory0" })
            );
        } catch (e) {
            console.log(e);
        }
    });
});
