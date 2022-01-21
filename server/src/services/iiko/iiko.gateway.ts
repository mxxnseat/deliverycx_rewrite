import { ApiTags } from "@nestjs/swagger";
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { StopListEntity } from "src/components/stopList/entities/stopList.entity";

@WebSocketGateway({
    namespace: "iiko",
    cors: "*"
})
@ApiTags("Websockets")
export class IikoWebsocketGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log("Socket initialized");
    }

    async sendStopListToClient(data: StopListEntity) {
        this.server.emit("stoplist_event", { data: data });
    }
}
