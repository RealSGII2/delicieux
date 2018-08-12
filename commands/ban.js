function banMember(bot, message, member, reason) {
	if (member.highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to ban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	if (!member.bannable) return message.reply("I do not have permission to ban this member!").catch(() => bot.safeSend(message, module.exports.help.name));
	member.send(`You were banned by \`${message.author.tag}\` for \`${reason}\`.`).then(() => {
		member.ban(`Banned by ${message.author.tag} for ${reason}`).then(() => {
			message.reply(`Successfully banned \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			return message.reply(`Failed to ban \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		});
	}).catch(() => {
		member.ban(`Banned by ${message.author.tag} for ${reason}`).then(() => {
			message.reply(`Successfully banned \`${member.user.tag}\`, but couldn't dm user.`).catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			return message.reply(`Failed to ban \`${member.user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
		});
	});
}
function banUser(bot, message, user, reason) {
	if (message.guild.member(user)) return banMember(bot, message, message.guild.member(user), reason);
	message.guild.ban(user, `Banned by ${message.author.tag} for ${reason}`).then(() => {
		message.reply(`Successfully banned \`${user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
	}).catch(() => {
		return message.reply(`Failed to ban \`${user.tag}\`.`).catch(() => bot.safeSend(message, module.exports.help.name));
	});
}
module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Invalid permissons! You must have the `BAN_MEMBERS` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[0] && !message.mentions.members.first()) return message.reply("Usage: `;ban (@member) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
		var reason = "No reason provided";
		if (args[1]) reason = args.splice(1, args.length).join(" ");
		if (message.mentions.members.first()) {
			banMember(bot, message, message.mentions.members.first(), reason);
		} else {
			bot.fetchUser(args[0]).then((user) => {
				message.guild.fetchBans().then((bans) => {
					if (bans.find((m) => m === user)) return message.reply("This user is already banned!").catch(() => bot.safeSend(message, module.exports.help.name));
					banUser(bot, message, user, reason);
				});
			}).catch(() => {
				return message.reply("Not a valid user!").catch(() => bot.safeSend(message, module.exports.help.name));
			});
		}
	},
	help: {
		name: "ban",
		category: "Moderation"
	}
};