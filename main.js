const { Telegraf } = require("telegraf");
const { botToken, idAdmin } = require("./config.json");

const bot = new Telegraf(botToken);

bot.on("message",  (ctx, next) => {
    console.log(ctx.update.message.chat.id)
    if(ctx.update.message.reply_to_message && ctx.update.message.reply_to_message.chat.id === idAdmin && ctx.message.reply_to_message.forward_from.id) {
        ctx.telegram.sendCopy(ctx.message.reply_to_message.forward_from.id, ctx.message);
    }
    if((!ctx.update.message.text && ctx.update.message.chat.id !== idAdmin)
        || (ctx.update.message.text && ctx.update.message.text.trim().toLowerCase() !== "/start" && ctx.update.message.text.trim().toLowerCase() !== "/help" && ctx.update.message.chat.id !== idAdmin)) {
        ctx.forwardMessage(idAdmin, ctx.update.message.chat.id, ctx.update.message.message_id);
    }
    next();
});

bot.start((ctx) => {
    ctx.reply("Привіт, це бот для зворотнього зв'язку Петя інфорозвідка.");
});

bot.help( (ctx) => {
    ctx.reply("Напишіть повідомлення і бот вам відповість ... Незабаром");
});

bot.launch()
