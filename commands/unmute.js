module.exports = {
	run: async (bot, message) => {
		if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Invalid permissons! You must have the `MANAGE_ROLES` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!message.mentions.members.first()) return message.reply("Usage: `;unmute @member`").catch(() => bot.safeSend(message, module.exports.help.name));
		var toUnmute = message.mentions.members.first();
		if (toUnmute.highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to unmute this member!").catch(() => bot.safeSend(message, module.exports.help.name));
		if (toUnmute.highestRole.position >= message.guild.me.highestRole.position) return message.reply("I do not have permission to unmute this member!").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!toUnmute.roles.map((m) => m.name).includes("Muted")) return message.reply("This user is not muted!").catch(() => bot.safeSend(message, module.exports.help.name));
		toUnmute.removeRole(message.guild.roles.find((m) => m.name === "Muted")).then(() => {
			if (bot.muted.includes(toUnmute.id)) bot.muted.splice(bot.muted.indexOf(toUnmute.id, 1));
			message.reply(`\`${toUnmute.user.tag}\` was unmuted.`).catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			message.channel.send(`Couldn't unmute \`${toUnmute.id}\`, check my permissions and try again.`).catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "unmute",
		category: "Moderation"
	}
};