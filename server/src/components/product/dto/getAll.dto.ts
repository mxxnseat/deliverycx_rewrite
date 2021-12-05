import { IsMongoIdObject } from "../../../common/decorators/mongoIdValidate.decorator";

export class GetAllDTO {
    @IsMongoIdObject()
    public categoryId: UniqueId;
}
