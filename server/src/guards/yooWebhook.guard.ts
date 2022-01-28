import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { isInSubnet } from "is-in-subnet";

@Injectable()
export class YooWebhookGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        return true;

        const allowedIp: Array<string> = [
            "185.71.76.0/27",
            "185.71.77.0/27",
            "77.75.153.0/25",
            "77.75.156.11/32",
            "77.75.156.35/32",
            "77.75.154.128/25",
            "2a02:5180:0:1509::/64",
            "2a02:5180:0:2655::/64",
            "2a02:5180:0:1533::/64",
            "2a02:5180:0:2669::/64"
        ];
        const ip = request.ip;

        if (isInSubnet(ip, allowedIp)) {
            return true;
        } else {
            return false;
        }
    }
}
