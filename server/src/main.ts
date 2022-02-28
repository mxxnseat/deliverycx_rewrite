import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const allowedRequestedFromHosts = process.env.CLIENT_PATH.split(" ");

    app.set("trust proxy", true);
    app.enableCors({
        origin: allowedRequestedFromHosts,

        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
bootstrap();
