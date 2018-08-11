module.exports.run = async (bot, message, args) => {
	if (!args[2]) return message.reply("Usage: `;setstatus (status: online, idle, invisible, dnd) (type: playing, listening, watching) (description)`");
	var status = args[0].toLowerCase().trim(),
		type = args[2].toUpperCase().trim(),
		desc = args.splice(1, 2).join(" ").trim();
	console.log(type);
	bot.user.setStatus(status).then(() => {
		bot.user.setActivity(desc, {type: type}).then((e) => {
			console.log(e);
		});
	});
};
module.exports.help = {
	name: "setstatus",
	category: "Developer"
};