import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class RemoveOneDTO {
    @IsMongoIdObject()
    public cartId: UniqueId;
}
