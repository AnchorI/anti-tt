import { Bot } from "grammy";

const bot = new Bot("5489995434:AAE7ivL2m44Y0BVedopI8XL2AEsDzw-pkQY"); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on(["message:entities:url", "edited_message"], (ctx) => {
    const text = ctx.msg.text

    if (text?.includes("tiktok")) {
        ctx.deleteMessage()
        ctx.reply("Фу, боже")
    }
})


bot.start();
