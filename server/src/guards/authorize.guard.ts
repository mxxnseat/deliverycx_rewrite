import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

function authValidate(req: Request) {
    if (!req.session.user) {
        return false;
    }

    return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        return authValidate(request);
    }
}
