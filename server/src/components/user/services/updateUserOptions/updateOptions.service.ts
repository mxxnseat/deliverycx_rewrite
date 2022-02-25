import { Injectable } from "@nestjs/common";
import { UpdateDTO } from "../../dto";
import { UserUsecase } from "../../usecases/user.usecase";

@Injectable()
export class UpdateOptionsService {
    constructor(private readonly userUsecase: UserUsecase) {}

    async update(user: UniqueId, updateOptions: UpdateDTO) {
        delete updateOptions.phone;

        await this.userUsecase.updateUser(user, updateOptions);
    }
}
