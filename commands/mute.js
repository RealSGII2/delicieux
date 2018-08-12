var ms = require("ms");
module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Invalid permissons! You must have the `MANAGE_ROLES` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[1] || !message.mentions.members.first()) return message.reply("Usage: `;mute (@member) (amount) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
		var toMute = message.mentions.members.first();
		if (!ms(args[1])) return message.reply("Usage: `;mute (@member) (amount) (reason)`").catch(() => bot.safeSend(message, module.exports.help.name));
		var reason = "No reason provided";
		if (args[2]) reason = args.splice(2, args.length).join(" ");
		if (ms(args[1]) < ms("10m") || ms(args[1]) > ms("3d")) return message.reply("Time must be between 10 minutes and 3 days!").catch(() => bot.safeSend(message, module.exports.help.name));
		if (toMute.highestRole.position >= message.member.highestRole.position) return message.reply("You do not have permission to mute this member!").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!message.guild.roles.find((m) => m.name === "Muted")) return message.reply("There is no muted role in this guild!").catch(() => bot.safeSend(message, module.exports.help.name));
		if (toMute.roles.map((m) => m.name).includes("Muted")) return message.reply("This user is already muted!").catch(() => bot.safeSend(message, module.exports.help.name));
		toMute.addRole(message.guild.roles.find((m) => m.name === "Muted")).then(() => {
			bot.muted.push(toMute.id);
			toMute.send(`You were muted by \`${message.author.tag}\` for \`${args[1]}\` for \`${reason}\``);
			message.reply(`\`${toMute.user.tag}\` was muted.`).catch(() => bot.safeSend(message, module.exports.help.name));
			bot.setTimeout(() => {
				bot.muted.splice(bot.muted.indexOf(toMute.id, 1));
				if (toMute.roles.map((m) => m.name).includes("Muted")) toMute.removeRole(message.guild.roles.find((m) => m.name === "Muted")).then(() => {
					message.channel.send(`\`${toMute.user.tag}\` was unmuted.`);
				}).catch(() => {
					message.channel.send(`Couldn't unmute \`${toMute.id}\`, you must unmute them manually`).catch(() => bot.safeSend(message, module.exports.help.name));
				});
			}, ms(args[1]));
		}).catch(() => {
			message.reply("Couldn't mute this user, check my permissions and try again").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "mute",
		category: "Moderation"
	}
};