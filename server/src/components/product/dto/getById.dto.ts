import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class GetByIdDTO {
    @IsMongoIdObject()
    public id: UniqueId;
}
