import {
    BadGatewayException,
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { catchError, Observable, throwError } from "rxjs";
import { BaseError } from "src/common/errors/base.error";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    constructor(
        @InjectPinoLogger()
        private readonly logger: PinoLogger
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log(context.);

        return next.handle().pipe(
            catchError((err: BaseError) => {
                this.logger.error(err.getError);
                return throwError(err);
            })
        );
    }
}
