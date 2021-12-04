import { config } from "dotenv";
config({
    path: __dirname + "/../.env"
});

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import * as session from "express-session";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true
        })
    );

    await app.listen(3000);
}
bootstrap();
