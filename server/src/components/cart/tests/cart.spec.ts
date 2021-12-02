import mongoose from "mongoose";
import { UserEntity } from "../../../components/user/entities/user.entity";
import { CartModel } from "../../../database/models/cart.model";
import { CategoryModel } from "../../../database/models/category.model";
import { ProductModel } from "../../../database/models/product.model";
import { UserModel } from "../../../database/models/user.model";
import { connection } from "../../../database/connection";
import { container } from "../../../ioc/container.ioc";
import { TYPES } from "../../../ioc/types.ioc";
import { ICartRepository } from "../repositories/interface.repository";
import { CartUsecase } from "../usecases/cart.usecase";
import { CartEntity } from "../entities/cart.entity";

describe("cart component test", () => {
    const cartRepository = container.get<ICartRepository>(TYPES.CartRepository);
    const cartUsecase = container.get<CartUsecase>(TYPES.CartUsecase);

    //datas
    let userId: string;
    const products: any = [];
    beforeAll(async () => {
        try {
            await connection();

            const user = await UserModel.create({
                name: "mxxnseat",
                username: "u_245g",
                phone: "+79876543322"
            });

            await user.save();
            userId = user._id;

            const category = await CategoryModel.create({
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
                products.push(product);
            }
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    afterAll(async () => {
        try {
            await CategoryModel.deleteMany();
            await ProductModel.deleteMany();
            await UserModel.deleteMany();
            await CartModel.deleteMany();
            await mongoose.connection.close();
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase should return CartEntity", async () => {
        try {
            const result = await cartUsecase.add(userId, products[0]._id);

            expect(result).toBeInstanceOf(CartEntity);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase add should increment existing product", async () => {
        try {
            const result = await cartUsecase.add(userId, products[0]._id);

            expect(result.getAmount).toBe(2);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase changeAmount should return number of count product", async () => {
        try {
            const cart = await CartModel.findOne();
            console.log(userId);
            console.log(cart);
            const result = await cartUsecase.changeAmount(
                userId,
                cart?._id as string,
                5
            );

            expect(result).toBe(5);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase getAll should return user cart", async () => {
        try {
            const result = await cartUsecase.getAll(userId);

            expect(result[0]).toBeInstanceOf(CartEntity);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });

    it("usecase removeAll should return empty array", async () => {
        try {
            const result = await cartUsecase.removeAll(userId);

            expect(result.length).toBe(0);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });
    it("usecase removeOne should return removed item id", async () => {
        try {
            const cart = await CartModel.findOne();

            const result = await cartUsecase.removeOne(
                userId,
                cart?._id as string
            );

            expect(result).toBe(cart?._id);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    });
});
