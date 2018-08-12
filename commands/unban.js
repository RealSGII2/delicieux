module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Invalid permissons! You must have the `BAN_MEMBERS` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[0] && !message.mentions.members.first()) return message.reply("Usage: `;unban member#1111`").catch(() => bot.safeSend(message, module.exports.help.name));
		message.guild.fetchBans().then((bans) => {
			if (!bans.find((m) => m.id === args[0] || m.tag === args[0])) return message.reply("Couldn't find this user to unban.").catch(() => bot.safeSend(message, module.exports.help.name));
			var user = bans.find((m) => m.id === args[0] || m.tag === args[0]);
			message.guild.unban(user, `Unbanned by ${message.author.tag}`).then(() => {
				message.reply(`Successfully unbanned \`${user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
			}).catch(() => {
				return message.reply(`Failed to unban \`${user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
			});
		}).catch(() => {
			return message.reply("Couldn't fetch bans. Please try again.").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "unban",
		category: "Moderation"
	}
};