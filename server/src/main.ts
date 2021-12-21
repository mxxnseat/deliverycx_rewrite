import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: (origin, cb) => {
            console.log(origin);

            if (
                [
                    process.env.CLIENT_PATH,
                    "https://yoomoney.ru/checkout/payments/v2"
                ].indexOf(origin) !== -1 ||
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
