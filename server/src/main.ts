import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin:
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "/",
        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
bootstrap();
