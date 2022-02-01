import { config } from "dotenv";
config();

import * as TelegramBot from "node-telegram-bot-api";
import * as express from "express";
import * as bodyParser from "body-parser";
import { generateMessage } from "./services/generateMessage/generateMessage.service";
const app = express();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

app.use(bodyParser());

app.post("/sendDuplicate/:organizationId", async (req, res) => {
    const organization = req.params.organizationId;
    const body = req.body;

    // console.log(body);

    const message = generateMessage(body);

    await bot.sendMessage(-593176460, message);

    res.status(200).json("Message is send");
});

bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    console.log(chatId);
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, "Received your message");
});

app.listen(process.env.PORT, () => {
    console.log("start");
});
