import { getConnectionToken } from "@nestjs/mongoose";
import { Connection, connect } from "mongoose";
import { UserSchema } from "../../../database/models/user.model";
import { RegisterService } from "../services/register/register.service";
import { SendCodeService } from "../services/sendCode/sendCode.service";

export const userProviders = [
    {
        provide: "User",
        useFactory: (connection: Connection) =>
            connection.model("User", UserSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },
    {
        provide: "SEND_CODE_SERVICE",
        useClass: SendCodeService
    },
    {
        provide: "REGISTER_SERVICE",
        useClass: RegisterService
    }
];
