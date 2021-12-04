import { IsString, IsOptional } from "class-validator";

import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class SearchQueryDTO {
    @IsMongoIdObject()
    public organizationId: UniqueId;

    @IsOptional()
    public searchString: string = "";
}
