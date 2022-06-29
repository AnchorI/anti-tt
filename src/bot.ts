import {Bot, Context, SessionFlavor} from "grammy";
import config from "./config";
import {Status} from "./interfaces/status.interface"

interface SessionData {
    messages: number
    edits: number
}

type MyContext = Context & SessionFlavor<SessionData>

const bot = new Bot<MyContext>(`${config.token}`);

let opgStatus = Status.opgActive
let pmdStatus = Status.pmdActive
let di4kaStatus = Status.di4kaActive

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("xyu", (ctx) => { ctx.replyWithSticker("CAACAgQAAxkBAAEFKB5ivFzImLFWDbjvULqyW_5H5IHXDgACRQIAAnDsAgHFeYAQhKGg8ikE") })

bot.command("premium", (ctx) => {
    const premium = ctx.msg.from?.is_premium
    if (premium == true) ctx.replyWithVideo("CgACAgIAAx0CWnnl-wACGiFivHJSI1QKswn6f5jZexRWMp8fbgACyhYAAqXxgEkUcnIYXfh0JykE")
    if (premium == false) {
        ctx.reply("Отсоси потом проси")
        ctx.replyWithSticker("CAACAgQAAxkBAAEFKB5ivFzImLFWDbjvULqyW_5H5IHXDgACRQIAAnDsAgHFeYAQhKGg8ikE")
    }
})

bot.command("off", (ctx) => {
    const chatId = ctx.msg?.chat.id

    switch (chatId) {
        case config.piramidaId:
            if (pmdStatus == Status.pmdActive){
                pmdStatus = Status.pmdDisabled
                ctx.reply("Bot Disabled")
            } else ctx.reply("Bot already disabled")
            break
        case config.opgId:
            if (opgStatus == Status.opgActive){
                opgStatus = Status.opgDisabled
                ctx.reply("Bot Disabled")
            } else ctx.reply("Bot already disabled")
            break
        case config.di4kaId:
            if (di4kaStatus == Status.di4kaActive){
                di4kaStatus = Status.di4kaDisabled
                ctx.reply("Bot Disabled")
            } else ctx.reply("Bot already disabled")
            break
    }
})

bot.command("on", (ctx) => {
    const chatId = ctx.msg?.chat.id

    switch (chatId) {
        case config.piramidaId:
            if (pmdStatus == Status.pmdDisabled){
                pmdStatus = Status.pmdActive
                ctx.reply("Bot Activated")
            } else ctx.reply("Bot already Activated")
            break
        case config.opgId:
            if (opgStatus == Status.opgDisabled){
                opgStatus = Status.opgActive
                ctx.reply("Bot Activated")
            } else ctx.reply("Bot already Activated")
            break
        case config.di4kaId:
            if (di4kaStatus == Status.di4kaDisabled){
                di4kaStatus = Status.di4kaActive
                ctx.reply("Bot Activated")
            } else ctx.reply("Bot already Activated")
            break
    }
})

bot.on("message", (ctx) => {
    const chatId = ctx.msg?.chat.id
    const text = ctx.msg?.text
    // console.log('mes', ctx.msg)
    if (text == "@all"){
        switch (chatId) {
            case config.piramidaId:
                if (pmdStatus == Status.pmdActive){
                    ctx.deleteMessage()
                    ctx.reply(`${config.piramida}`)
                }
                break
            case config.opgId:
                if (pmdStatus == Status.opgDisabled) {
                    ctx.deleteMessage()
                    ctx.reply(`${config.opg}`)
                }
                break
            case config.di4kaId:
                if (pmdStatus == Status.di4kaActive) ctx.reply(`${config.di4ka}`)
                break
        }
    }
})

bot.on(["message", "edited_message"], (ctx) => {
            const text = ctx.msg.text
            const tiktok = /(tiktok|тикток)/g

            if (text && tiktok.test(text) && !text?.includes("stop")) {
                // ctx.deleteMessage()
                ctx.reply("Хватит присылать это говно")
            }
})

bot.catch(err => console.error(err))

bot.start();
