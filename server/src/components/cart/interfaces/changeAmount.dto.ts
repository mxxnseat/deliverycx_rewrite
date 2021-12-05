import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";
import { IsNumber } from "class-validator";

export class ChangeAmountDTO {
    @IsNumber()
    public amount: number;

    @IsMongoIdObject()
    public cartId: UniqueId;
}
