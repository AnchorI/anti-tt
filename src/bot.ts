import { Bot } from "grammy";

const bot = new Bot(""); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message:entities:url", (ctx) => {
    const text = ctx.msg.text

    if (text.includes("tiktok")) {
        ctx.deleteMessage()
        ctx.reply("Фу, боже")
    }
})

bot.start();
