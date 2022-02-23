import { Inject, Injectable } from "@nestjs/common";
import { UserClass } from "src/database/models/user.model";
import { Model } from "mongoose";
import { IGuestGenerateService } from "./guestUsername.stub";
import { generateString } from "src/common/utils/generateString.util";

@Injectable()
export class GenerateUsernameService implements IGuestGenerateService {
    constructor(
        @Inject("User")
        private readonly UserModel: Model<UserClass>
    ) {}

    async generate(): Promise<string> {
        const username = "u_" + generateString(36, -8);

        const isFind = await this.UserModel.findOne({ username });

        if (isFind) {
            return this.generate();
        }
        return username;
    }
}
