
import { Bot } from "grammy";
import { TOKEN } from "../config/config";

const bot = new Bot(`${TOKEN}`); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on(["message:entities:url", "edited_message"], (ctx) => {
    const text = ctx.msg.text

    if (text?.includes("tiktok")) {
        ctx.deleteMessage()
        ctx.reply("Фу, боже")
    }
})


bot.start();