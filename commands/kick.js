function kickMember(bot, message, member, reason) {
	if (message.mentions.members.first().highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to kick this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!message.mentions.members.first().kickable) return message.reply("I do not have permission to kick this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	member.send(`You were kicked by ${message.author.tag} for ${reason}.`).then(() => {
		member.kick(`Kicked by ${message.author.tag} for ${reason}`).then(() => {
			message.reply(`Successfully kicked \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			return message.reply(`Failed to kick \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		});
	}).catch(() => {
		member.kick(`Kicked by ${message.author.tag} for ${reason}`).then(() => {
			message.reply(`Successfully kicked \`${member.user.tag}\`, but couldn't dm user.`).catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			return message.reply(`Failed to kick \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		});
	});
}
module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Invalid permissons! You must have the `KICK_MEMBERS` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!args[0] && !message.mentions.members.first()) return message.reply("Usage: `;kick (@member) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
	var reason = "No reason provided";
	if (args.splice(0, 1)) {
		reason = args.splice(0, 1).join(" ");
	}
	if (message.mentions.members.first()) {
		kickMember(bot, message, message.mentions.members.first(), reason);
	} else {
		return bot.fetchUser(args[0]).then((user) => {
			if (message.guild.member(user)) {
				kickMember(bot, message, message.guild.member(user), reason);
			} else {
				return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
			}
		}).catch(() => {
			return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	}
};
module.exports.help = {
	name: "kick",
	category: "Moderation"
};