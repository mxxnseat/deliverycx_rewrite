import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from "@nestjs/common";
import { Request, Response } from "express";
import { BaseError } from "src/common/errors/base.error";

@Catch(BaseError)
export class BaseErrorsFilter implements ExceptionFilter {
    catch(exception: BaseError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        response.status(exception.getStatus).json({
            path: request.path,
            errors: exception.getError
        });
    }
}
