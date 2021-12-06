import { CustomError } from "./base.error";

export class OrderError extends CustomError {
    constructor(message: string) {
        super(message, 422);
    }
}
