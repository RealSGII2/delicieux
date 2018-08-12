module.exports = {
	run: async (bot, message, args) => {
		if (!bot.developers.includes(message.author.id)) return message.reply("This command is restricted to bot developers.");
		if (!args[2]) return message.reply("Usage: `;setstatus (status: online, idle, invisible, dnd) (type: playing, listening, watching) (description)`").catch(() => bot.safeSend(message, module.exports.help.name));
		bot.user.client.user.setPresence({ game: { type: args[1].toUpperCase(), name: args.splice(2, args.length).join(" ") }, status: args[0].toLowerCase() }).then(() => {
			message.reply(":white_check_mark: All set!").catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			message.reply(":x: Couldn't change the status!").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "setstatus",
		category: "Developer"
	}
};