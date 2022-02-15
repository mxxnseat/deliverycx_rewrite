/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from "socket.io-client";

type ISocketSingle = {
    subscribers(data: any): void;
};

class SocketSingle {
    static _instanse: null | SocketSingle = null;
    protected socket: ReturnType<typeof io> | null;
    constructor(sock?: any) {
        this.socket = sock;
    }
    public connect(endpoint: string) {
        return io(endpoint, { transports: ["websocket"] });
    }
    subscribers<T>(sub: string, cb: (data: T | null, error: boolean) => void) {
        if (this.socket) {
            this.socket.on(sub, ({ data }) => {
                if (data) {
                    cb(data, false);
                } else {
                    cb(null, true);
                }
            });
        }
    }
    newsocket(connect: string) {
        const coontect = this.connect(connect);
        return new SocketSingle(coontect);
    }

    static get getInstance() {
        if (!SocketSingle._instanse) {
            SocketSingle._instanse = new SocketSingle();
        }
        return SocketSingle._instanse;
    }
}
export default SocketSingle.getInstance;
