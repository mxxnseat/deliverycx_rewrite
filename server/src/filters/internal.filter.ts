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
        const status = exception.getStatus ? exception.getStatus() : 500;
        console.log(1111);
        console.log(exception, host);
        response.status(status).json({
            path: request.path,
            message: exception?.message || "Уууупс что-то пошло не так"
        });
    }
}
