var rbx = require("noblox.js");
module.exports = {
	run: async (bot, message, args) => {
		if (!message.member.roles.get("432671352743526402")) return message.reply("Invalid permissons! You must have the `Leadership Team` role.").catch(() => bot.safeSend(message, module.exports.help.name));
		if (!args[1]) return message.reply("Usage: `;rank (username) (rank)`").catch(() => bot.safeSend(message, module.exports.help.name));
		rbx.getRoles(4034813).then((roles) => {
			rbx.getIdFromUsername(args[0]).then((result) => {
				rbx.getRankInGroup(4034813, result).then((currentRank) => {
					if (currentRank === 0) return message.reply("This person isn't in the group!").catch(() => bot.safeSend(message, module.exports.help.name));
					var rank = args.splice(1, args.length).join(" ");
					if (!roles.find((role) => role.Name === rank)) return message.reply("Not a valid rank name!").catch(() => bot.safeSend(message, module.exports.help.name));
					if (roles.find((role) => role.Name === rank).Rank > roles.find((role) => role.Name === "President").Rank || currentRank > roles.find((role) => role.Name === "President").Rank) return message.reply("You cannot change the rank of a President+, or rank anyone above President.").catch(() => bot.safeSend(message, module.exports.help.name));
					rbx.setRank(4034813, result, roles.find((role) => role.Name === rank).Rank).then(() => {
						message.reply(`Ranked \`${args[0]}\` to \`${rank}\``).catch(() => bot.safeSend(message, module.exports.help.name));
					}).catch(() => {
						message.reply("Couldn't rank this user in the group.").catch(() => bot.safeSend(message, module.exports.help.name));
					});
				}).catch(() => {
					message.reply("Couldn't fetch this user's rank.").catch(() => bot.safeSend(message, module.exports.help.name));
				});
			}).catch(() => {
				message.reply("Couldn't find this user.").catch(() => bot.safeSend(message, module.exports.help.name));
			});
		}).catch(() => {
			message.reply("Couldn't fetch group ranks.").catch(() => bot.safeSend(message, module.exports.help.name));
		});
	},
	help: {
		name: "rank",
		category: "Group Administration"
	}
};
