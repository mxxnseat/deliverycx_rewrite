import { Inject, Injectable } from "@nestjs/common";
import { UserClass } from "src/database/models/user.model";
import { Model } from "mongoose";

@Injectable()
export class GenerateUsernameService {
    constructor(
        @Inject("USER_MODEL")
        private readonly userModel: Model<UserClass>
    ) {}

    async generate(): Promise<string> {
        const username = "u_" + Math.random().toString(36).substr(2, 9);

        const isFind = await this.userModel.findOne({ username });

        if (isFind) {
            return this.generate();
        }
        return username;
    }
}
