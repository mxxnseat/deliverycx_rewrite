import mongoose, { Document } from "mongoose";
import { connection } from "../../../database/connection";
import { IProductRepository } from "../repositories/interface.repository";
import { ProductModel } from "../../../database/models/product.model";
import { container } from "../../../ioc/container.ioc";
import { TYPES } from "../../../ioc/types.ioc";
import { CategoryModel } from "../../../database/models/category.model";

describe("Product component test", () => {
    const productRepository = container.get<IProductRepository>(
        TYPES.ProductRepository
    );
    let category: Document;
    beforeAll(async () => {
        await connection();

        category = await CategoryModel.create({
            id: "some_id",
            name: "category",
            image: "category/image/path"
        });

        await category.save();

        for (let i = 0; i < 5; i++) {
            const product = await ProductModel.create({
                id: "someid" + i + 1,
                name: "testname" + i,
                description: "description" + i,
                additionalInfo: "addinfo" + i,
                price: i + 1 * 0.5,
                weight: 0.561,
                category: category._id,
                image: "imagepath/" + i,
                measureUnit: "порц"
            });

            await product.save();
        }
    });

    afterAll(async () => {
        try {
            await CategoryModel.deleteMany();
            await ProductModel.deleteMany();
            await mongoose.connection.close();
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });

    it("product repository should return one product with category image", async () => {
        try {
            const product = await productRepository.getOne("someid11");
            expect(product).toEqual(
                expect.objectContaining({
                    id: "someid11",
                    categoryImage: "category/image/path"
                })
            );
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });
    it("product repository should return array of products by category", async () => {
        try {
            const products = await productRepository.getAll(category._id);
            expect(products).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ id: "someid11" })
                ])
            );
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });
});
