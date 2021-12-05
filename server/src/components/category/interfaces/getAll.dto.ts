import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class GetAllDTO {
    @IsMongoIdObject()
    organizationId: UniqueId;
}
