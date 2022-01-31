import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import * as session from "express-session";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { OrganizationClass } from "src/database/models/organization.model";
import { CityModule } from "src/ioc/city.module";
import { OrganizationModule } from "src/ioc/organization.module";
import * as request from "supertest";
import { citiesIds, organizationStubs } from "./stubs/organization.stub";

describe("Organization Module", () => {
    let app: INestApplication;
    let mongo: MongoMemoryServer;
    let organizations: any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongo = await MongoMemoryServer.create();

                        return {
                            uri: mongo.getUri()
                        };
                    },
                    connectionName: "DatabaseConnection"
                }),
                OrganizationModule,
                CityModule
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        app.use(
            session({
                secret: "test",
                saveUninitialized: false,
                resave: false
            })
        );

        const organizationModel =
            moduleRef.get<Model<OrganizationClass>>("Organization");
        organizations = await organizationModel.insertMany(organizationStubs);
        await app.init();
    });

    describe("Organization Get", () => {
        it("should return organization list", (done) => {
            request(app.getHttpServer())
                .get(`/organization/all?cityId=${citiesIds[0]._id}`)
                .expect(200)
                .then((res) => {
                    expect(res.body).toBeInstanceOf(Array);
                    done();
                });
        });
    });

    afterAll(async () => {
        await app.close();
        await mongo.stop();
    });
});
