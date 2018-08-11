function banMember(bot, message, member, reason) {
	if (message.mentions.members.first().highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to ban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!message.mentions.members.first().bannable) return message.reply("I do not have permission to ban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	member.send(`You were banned by ${message.author.tag} for ${reason}.`);
	member.ban(`Banned by ${message.author.tag} for ${reason}`).then(() => {
		message.reply(`Successfully banned \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
	}).catch(() => {
		return message.reply(`Failed to ban \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
	});
}
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Invalid permissons! You must have the `BAN_MEMBERS` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!args[0] && !message.mentions.members.first()) return message.reply("Usage: `;ban (@member) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
	var reason = "No reason provided";
	if (args.splice(0, 1)) {
		reason = args.splice(0, 1).join(" ");
	}
	if (message.mentions.members.first()) {
		banMember(bot, message, message.mentions.members.first(), reason);
	} else {
		return bot.fetchUser(args[0]).then((user) => {
			if (message.guild.member(user)) {
				banMember(bot, message, message.guild.member(user), reason);
			} else {
				return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
			}
		}).catch(() => {
			return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	}
};
module.exports.help = {
	name: "ban",
	category: "Moderation"
};