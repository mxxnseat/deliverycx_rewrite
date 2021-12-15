import { IProfileEntities } from "domain/entities/ProfileEntities/Profile.entities";
import { ApiSuper, methods, token } from "../AxiosApi";

type IDatReg = {
    isNew: boolean;
    access?: string;
};
interface IUpdateData {
    name?: string;
    phone?: string;
    address?: {
        home: number;
        street: string;
    };
    organizationId?: string;
}
interface IUpdateUserResponse {
    message: string;
    user: Omit<IProfileEntities, "organization">;
}
class RequestProfile extends ApiSuper {
    @methods("post")
    register() {
        return this.request<IDatReg>("/user/create");
    }
    @methods("patch")
    update(data: IUpdateData) {
        return this.request<IUpdateUserResponse>("/user/update");
    }
}
export default new RequestProfile();
