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
        console.log(value);

        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException("Неверный параметр запроса");
        }

        return value;
    }
}
