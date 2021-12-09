import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import * as session from "express-session";
import { doc } from "./docs/api.doc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: false,
                httpOnly: false
            }
        })
    );
    app.enableCors({
        origin: "http://localhost:3000",
        credentials: true
    });

    doc(app);

    await app.listen(process.env.PORT);
}
bootstrap();
