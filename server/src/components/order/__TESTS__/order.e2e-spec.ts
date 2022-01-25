import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { LoggerModule } from "nestjs-pino";
import { cartProviders } from "src/components/cart/providers/cart.provider";
import { organizationProviders } from "src/components/organization/providers/organization.provider";
import { productProviders } from "src/components/product/providers/product.provider";
import { userProviders } from "src/components/user/providers/user.provider";
import { CartClass } from "src/database/models/cart.model";
import { OrganizationClass } from "src/database/models/organization.model";
import { ProductClass } from "src/database/models/product.model";
import { UserClass } from "src/database/models/user.model";
import { OrderModule } from "src/ioc/order.module";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { IikoService } from "src/services/iiko/iiko.service";
import { PaymentMethods } from "src/services/payment/payment.abstract";
import * as request from "supertest";
import {
    cartStub,
    productsStub,
    userStub,
    organizationId,
    organizationStub,
    userId
} from "./stubs";

describe("Order Module", () => {
    let app: INestApplication;
    let mongo: MongoMemoryServer;
    let iikoService: IikoService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongo = await MongoMemoryServer.create();

                        return {
                            uri: mongo.getUri()
                        };
                    }
                }),
                LoggerModule.forRoot({}),
                OrderModule
            ],
            providers: [
                ...cartProviders,
                ...productProviders,
                ...userProviders,
                ...organizationProviders
            ]
        }).compile();

        iikoService = moduleRef.get<IikoService>("IIiko");

        console.log(iikoService.create);
        const cartModel = moduleRef.get<Model<CartClass>>("Cart");
        const userModel = moduleRef.get<Model<UserClass>>("User");
        const productModel = moduleRef.get<Model<ProductClass>>("Product");
        const organizationModel = await moduleRef.get<Model<OrganizationClass>>(
            "Organization"
        );

        await cartModel.insertMany(cartStub);
        await userModel.insertMany(userStub);
        await productModel.insertMany(productsStub);
        await organizationModel.insertMany(organizationStub);

        app = moduleRef.createNestApplication();
        app.use((req, res, next) => {
            req.session = {
                user: userId
            };

            next();
        });
        await app.init();
    });

    afterEach(async () => {
        await app.close();
        await mongo.stop();
    });

    describe("Order Tests", () => {
        it("should return order number", (done) => {
            jest.spyOn<any, "create">(IikoService, "create");
            const sendData = {
                organization: organizationId,
                name: "TestOrderUser",
                address: {
                    city: "Симферополь",
                    street: "улица Турецкая",
                    home: 15
                },
                phone: "+79786517145",
                paymentMethod: PaymentMethods.CASH,
                comment: "This is a test order from test env",
                email: "test@tt.com"
            };

            request(app.getHttpServer())
                .post("/order/create")
                .send(sendData)
                .expect(200)
                .then((res) => {
                    expect(res.body.number).toBe(777);

                    done();
                })
                .catch((e) => {
                    done(e);
                });
        }, 20000);
    });
});
