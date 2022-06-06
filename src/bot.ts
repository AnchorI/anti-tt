import { Bot } from "grammy";
import config from "./config";

const bot = new Bot(`${config.token}`); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on(["message:entities:url", "edited_message"], (ctx) => {
    const text = ctx.msg.text

    if (text?.includes("tiktok")) {
        ctx.deleteMessage()
        ctx.reply("Фу, боже")
    }
})

bot.catch(err => console.error(err))

bot.start();