import { Bot, Context } from "grammy";import config from "./config";

type MyContext = Context

const bot = new Bot<MyContext>(`${config.token}`); // <-- put your authentication token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("MitchPidor", (ctx) => {
    ctx.reply("А ты шаришь")
    ctx.replyWithSticker("CAACAgIAAxkBAAEFCf1iqJ4pHdmJFyjSSfYSxJ5Bj9OZNAACtQEAAvnkbAABxHAP4NXF1FckBA")
} )


bot.hears("ping", async (ctx) => {
    // `reply` is an alias for `sendMessage` in the same chat (see next section).
    await ctx.reply("pong", {
        // `reply_to_message_id` specifies the actual reply feature.
        reply_to_message_id: ctx.msg.message_id,
    });
});


bot.on(["message:entities:url", "edited_message"], (ctx) => {
    const text = ctx.msg.text

    if (text?.includes("tiktok")) {
        ctx.deleteMessage()
        ctx.reply("Фу, боже")
    }

    console.log('text', text)
})

bot.on("message", (ctx) => {
    const text = ctx.msg.text

    if (text?.includes("пидор" || "Пидор" || "пидорасина" || "Пидорасина")) {
        ctx.reply("А ты шаришь")
        ctx.replyWithSticker("CAACAgIAAxkBAAEFCf1iqJ4pHdmJFyjSSfYSxJ5Bj9OZNAACtQEAAvnkbAABxHAP4NXF1FckBA")
    }
})

bot.catch(err => console.error(err))

bot.start();