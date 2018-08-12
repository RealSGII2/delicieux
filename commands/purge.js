module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Invalid permissons! You must have the `MANAGE_MESSAGES` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[0] || !Number(args[0])) return message.reply("Usage: `;purge (number)`").catch(() => bot.safeSend(message, module.exports.help.name));
		var amount = Number(args[0]);
		if (amount > 100 || amount < 5 ) return message.reply("You must supply a number between 5 and 100!").catch(() => bot.safeSend(message, module.exports.help.name));
		message.delete().then(() => {
			message.channel.bulkDelete(amount).then((messages) => {
				return message.reply(`Deleted ${messages.size} messages.`).then((newMessage) => {
					newMessage.delete(3000);
				}).catch(() => bot.safeSend(message, module.exports.help.name));
			}).catch(() => {
				return message.reply("I do not have permission to delete messages in this channel! Please give me permissions and try again.").catch(() => bot.safeSend(message, module.exports.help.name));
			});
		}).catch(() => {
			return message.reply("I do not have permission to delete messages in this channel! Please give me permissions and try again.").catch(() => bot.safeSend(message, module.exports.help.name));
		});

	},
	help: {
		name: "purge",
		category: "Moderation"
	}
};