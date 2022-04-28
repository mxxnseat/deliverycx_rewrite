import { config } from "dotenv";
config();

import * as TelegramBot from "node-telegram-bot-api";
import * as express from "express";
import * as bodyParser from "body-parser";
import { generateMessage } from "./services/generateMessage/generateMessage.service";
import { OrganizationRepository } from "./repository/organization.repository";
import { connection } from "./db/connection";
const app = express();

const bot = new TelegramBot("5298758359:AAE7gfGy8xpd5DGvmi8ca6rc_AeMal4nT0U", { polling: true });

app.use(bodyParser());

app.post("/sendDuplicate/:organizationId", async (req, res) => {
    const organization = req.params.organizationId;
    const body = req.body;
    const organizationDoc = await OrganizationRepository.getOne(organization);

    if (!organizationDoc) {
        return res.status(200).json({
            haveProblem: true,
            message: "Organization not found"
        });
    }

    const message = generateMessage(body);

    await bot.sendMessage(organizationDoc.chat, message);

    res.status(200).json({ haveProblem: false, message: "Message is send" });
});

bot.onText(/\/reg (.+)/i, async (msg, match) => {
    const chatId = msg.chat.id;

    const organizationDoc = await OrganizationRepository.getOne(match[1]);

    if (organizationDoc) {
        return bot.sendMessage(
            chatId,
            "Данная организация уже зарегистрирована в боте"
        );
    }

    await OrganizationRepository.register(chatId, match[1]);

    bot.sendMessage(chatId, "Ваше заведение успешно зарегистрированно");
});

bot.onText(/\/del (.+)/i, async (msg, match) => {
    const chatId = msg.chat.id;
    const organization = match[1];

    if (!organization) {
        return bot.sendMessage(chatId, "Заданная организация пуста");
    }

    const result = await OrganizationRepository.removeOne(chatId, match[1]);
    if (result.deletedCount === 0) {
        return bot.sendMessage(chatId, "Нечего удалять");
    }
    bot.sendMessage(chatId, "Успешно удалено");
});

connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("start");
    });
});
