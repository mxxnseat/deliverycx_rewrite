import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { doc } from "./docs/api.doc";
import { NestExpressApplication } from "@nestjs/platform-express";
import { WorkerProccess } from "./services/worker.service";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.set("trust proxy", true);
    app.enableCors({
        origin: [process.env.CLIENT_PATH],

        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
WorkerProccess.clusterizing(bootstrap);
