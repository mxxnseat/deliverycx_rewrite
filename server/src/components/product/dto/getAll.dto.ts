import { IsMongoIdObject } from "../../../common/decorators/mongoIdValidate.decorator";

export class GetAllDTO {
    @IsMongoIdObject({
        message: "Неверный параметр запроса"
    })
    public categoryId: UniqueId;
}
