import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as express from "express";

interface IConfig {
    key?: string;
    cert?: string;
    ca?: string;
}

async function bootstrap() {
    let config: IConfig;

    if (process.env.NODE_ENV === "production") {
        config = require("../websocket.config.prod");
    } else {
        config = {};
    }

    const options = {};

    const express_inst: express.Express = express();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions: options
    });

    app.set("trust proxy", true);
    app.enableCors({
        origin: [process.env.CLIENT_PATH, "https://yoomoney.ru"],

        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
bootstrap();
