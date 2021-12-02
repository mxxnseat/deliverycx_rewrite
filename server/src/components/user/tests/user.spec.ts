import mongoose from "mongoose";
import { container } from "../../../ioc/container.ioc";
import { connection } from "../../../database/connection";
import { UserRepository } from "../repositories/base.repository";
import { TYPES } from "../../../ioc/types.ioc";
import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../../../database/models/user.model";
import { IUserRepository } from "../repositories/interface.repository";
import { UserUsecase } from "../usecases/user.usecase";

describe("user tests", () => {
    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    const userUsecase = container.get<UserUsecase>(TYPES.UserUsecase);

    beforeAll(async () => {
        try {
            await connection();
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });

    afterAll(async () => {
        try {
            await UserModel.deleteMany();
            await mongoose.connection.close();
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });

    it("user repository should create user", async () => {
        try {
            const userEntity = new UserEntity("mxxnseat");

            await userRepository.create(userEntity);

            const expectData = await UserModel.findOne({
                username: "mxxnseat"
            });
            expect(expectData).not.toEqual(null);
        } catch (e: unknown) {
            console.log(e);
            throw new Error();
        }
    });
});
