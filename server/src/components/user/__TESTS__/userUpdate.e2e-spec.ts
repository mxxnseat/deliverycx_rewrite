import * as request from "supertest";
import { Test } from "@nestjs/testing";
import * as session from "express-session";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { INestApplication } from "@nestjs/common";
import { UserModule } from "src/ioc/user.module";
import { UpdateOptionsService } from "../services/updateUserOptions/updateOptions.service";
import { InjectTokenEnum } from "../providers/constants";
import { UpdateDTO } from "../dto";
import { Model, Types } from "mongoose";
import { UserClass } from "src/database/models/user.model";
import { RedisModule } from "src/modules/redis/redis.module";
import { RedisClient } from "redis";
import { REDIS } from "src/modules/redis/redis.constants";

describe("User Module", () => {
    let app: INestApplication;
    let mongoConnection: MongoMemoryServer;
    let updateOptionsService: UpdateOptionsService;
    let id: Types.ObjectId;
    let userModel: Model<UserClass>;
    let redis: RedisClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongoConnection = await MongoMemoryServer.create();
                        const mongoUri = mongoConnection.getUri();

                        return {
                            uri: mongoUri
                        };
                    }
                }),
                UserModule
            ]
        }).compile();

        updateOptionsService = moduleRef.get<UpdateOptionsService>(
            InjectTokenEnum.UPDATE_OPTIONS_SERVICE
        );

        redis = moduleRef.get<RedisClient>(REDIS);
        userModel = moduleRef.get<Model<UserClass>>(InjectTokenEnum.USER);

        const userDoc = await userModel.create({
            username: "test",
            phone: "+66666666"
        });

        id = userDoc._id;

        app = moduleRef.createNestApplication();
        app.use(
            session({
                secret: "test",
                saveUninitialized: false,
                resave: false
            })
        );
        await app.init();
    });

    describe("User creation test", () => {
        it("should return created user", (done) => {
            const data: UpdateDTO = {
                email: "test@test.test",
                name: "test",
                phone: "+777777777777"
            };

            updateOptionsService.update(id.toString(), data).then(async () => {
                const userDoc2 = await userModel.findOne({ _id: id });

                expect(userDoc2.email).toBe(data.email);
                expect(userDoc2.name).toBe(data.name);
                expect(userDoc2.phone).toBe("+66666666");

                done();
            });
        });
    });

    afterAll(async () => {
        await mongoConnection.stop();
        await app.close();

        redis.quit();
    });
});
