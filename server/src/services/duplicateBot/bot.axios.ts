import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { Bot } from "./interfaces";

@Injectable()
export class BotAxios {
    private axios: AxiosInstance;

    constructor() {
        this.init();
    }

    private init() {
        this.axios = axios.create({
            baseURL: process.env.BOT_URL
        });
    }

    async sendDuplicate(
        organization: UniqueId,
        data: Bot.IRequestBody
    ): Promise<void> {
        this.axios.post(`/sendDuplicate/${organization}`, data);
    }
}

export const BotAxiosProvider = {
    provide: "BOT_AXIOS",
    useClass: BotAxios
};
