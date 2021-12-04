declare global {
    namespace jest {
        interface Matchers<R> {}
    }
}

export {};

declare module "express-session" {
    interface SessionData {
        user: UniqueId;
    }
}
