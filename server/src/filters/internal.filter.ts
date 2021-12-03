import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class InternalException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        response.status(500).json({
            path: request.path,
            data: exception.message,
            message: "Уууупс что-то пошло не так. Попробуйте позже"
        });
    }
}
