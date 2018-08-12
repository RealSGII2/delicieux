module.exports = {
	run: async (bot, message) => {
		message.reply(`You flipped ${(Math.floor(Math.random() * 2)) ? "heads" : "tails"}!`).catch(() => bot.safeSend(message, module.exports.help.name));
	},
	help: {
		name: "cointoss",
		category: "Fun"
	}
};