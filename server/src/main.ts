import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.set("trust proxy", true);
    app.enableCors({
        origin: (origin, cb) => {
            if (
                [process.env.CLIENT_PATH, "https://yoomoney.ru"].indexOf(
                    origin
                ) !== -1 ||
                !origin
            ) {
                cb(null, true);
            } else {
                cb(new Error("Not allowed by CORS"));
            }
        },

        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
bootstrap();
