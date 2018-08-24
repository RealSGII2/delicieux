var rbx = require("roblox-js");
module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.hasPermission("MANAGE_ROLES") || message.guild.id !== "432666063562342410" && !bot.developers.includes(message.author.id)) return message.reply("Invalid permissons! You must have the `MANAGE_ROLES` permission.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[0]) return message.reply("Usage: `;shout (message)`").catch(() => bot.safeSend(message, module.exports.help.name));
		rbx.shout(4034813, args.join(" ")).then(() => {
			message.reply("Successfully shouted to the group.").catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			message.reply("Couldn't shout message to the group.").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "shout",
		category: "Group Administration"
	}
};