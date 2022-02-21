import { Controller } from "@nestjs/common";
import {
    MessagePattern,
    Payload,
    Ctx,
    RmqContext
} from "@nestjs/microservices";

@Controller()
export class OrderController {
    constructor() {}

    @MessagePattern("order-create")
    async createOrder(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        console.log(data);

        channel.ack(originalMsg);
    }
}
