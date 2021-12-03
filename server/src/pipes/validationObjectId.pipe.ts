import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import { ObjectSchema } from "joi";
import { Types } from "mongoose";

@Injectable()
export class ValidationObjectId implements PipeTransform {
    transform(value: UniqueId, metadata: ArgumentMetadata) {
        console.log(metadata.data);

        if (
            !Types.ObjectId.isValid(value) &&
            metadata.data !== "searchString"
        ) {
            throw new BadRequestException("Неверный параметр запроса");
        }

        return value;
    }
}
