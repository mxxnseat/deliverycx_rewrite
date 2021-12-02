import { CustomError } from "./base.error";

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}
