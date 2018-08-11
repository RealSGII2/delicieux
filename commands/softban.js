function softBanMember(bot, message, member, days, reason) {
	if (message.mentions.members.first().highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to softban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!message.mentions.members.first().bannable) return message.reply("I do not have permission to softban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	member.send(`You were softbanned by ${message.author.tag} for ${reason}.`).then(() => {
		member.ban({ reason: `Softbanned by ${message.author.tag} for ${reason}`, days: days }).then((banned) => {
			message.guild.unban(banned.user).then(() => {
				message.reply(`Successfully softbanned \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
			}).catch(() => {
				return message.reply(`Failed to ban \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
			});
		});
	}).catch(() => {
		member.ban({ reason: `Softbanned by ${message.author.tag} for ${reason}`, days: days }).then((banned) => {
			message.guild.unban(banned.user).then(() => {
				message.reply(`Successfully softbanned \`${member.user.tag}\`, but couldn't dm user.`).catch(() => bot.safeSend(message, module.exports.help.name));
			}).catch(() => {
				return message.reply(`Failed to ban \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
			});
		});
	});
}
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Invalid permissons! You must have the `BAN_MEMBERS` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!args[1] && !message.mentions.members.first()) return message.reply("Usage: `;softban (@member) (days to delete) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!Number(args[1])) return message.reply("Usage: `;softban (@member) (days to delete) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
	if (Number(args[1]) > 7 || Number(args[1] < 1)) return message.reply("Number of days must be between 1 and 7!").catch(() => bot.safeSend(message, module.exports.help.name));
	var reason = "No reason provided";
	if (args.splice(0, 2)) {
		reason = args.splice(0, 2).join(" ");
	}
	if (message.mentions.members.first()) {
		softBanMember(bot, message, message.mentions.members.first(), Number(args[1]), reason);
	} else {
		bot.fetchUser(args[0]).then((user) => {
			if (message.guild.member(user)) {
				softBanMember(bot, message, message.guild.member(user), Number(args[1]), reason);
			} else {
				return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
			}
		}).catch(() => {
			return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	}
};
module.exports.help = {
	name: "softban",
	category: "Moderation"
};