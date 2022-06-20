import { Bot, Context } from "grammy";
import config from "./config";
import { Status } from "./interfaces/status.interface"

type MyContext = Context

const bot = new Bot<MyContext>(`${config.token}`);

let status = Status.Active

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("MitchPidor", (ctx) => {
    ctx.reply("А ты шаришь")
    ctx.replyWithSticker("CAACAgIAAxkBAAEFCf1iqJ4pHdmJFyjSSfYSxJ5Bj9OZNAACtQEAAvnkbAABxHAP4NXF1FckBA")
} )

bot.command("off", (ctx) => {
    status = Status.Disabled
    ctx.reply("Bot Disable")
})
bot.command("on", (ctx) => {
    status = Status.Active
    ctx.reply("Bot Active")
})

bot.on(["message", "edited_message"], (ctx) => {
        if(status == "active") {
            const text = ctx.msg.text
            const rexExp = /пидор/i
            const tiktok = /(tiktok|тикток)/g
            const botExp = /бот/i

            if(text && botExp.test(text) && !text?.includes("stop")){
                ctx.reply(" Ты меня не трогай, все вопросы к @AnchorI")
                ctx.replyWithSticker("CAACAgIAAxkBAAEFCgFiqKDf-2QNSpMI-MCjU3CD2RWegwACCgADTDbWBDafo3IkQrt9JAQ")
            }

            if (text && rexExp.test(text) && !text?.includes("stop")) {
                ctx.reply("А ты шаришь")
                ctx.replyWithSticker("CAACAgIAAxkBAAEFCf1iqJ4pHdmJFyjSSfYSxJ5Bj9OZNAACtQEAAvnkbAABxHAP4NXF1FckBA")
            }

            if (text && tiktok.test(text) && !text?.includes("stop")) {
                ctx.deleteMessage()
                ctx.reply("Никаких тиктоков нахуй")
            }
        }

})

bot.catch(err => console.error(err))

bot.start();
