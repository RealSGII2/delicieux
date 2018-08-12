const index = require("../index.js");
module.exports.run = async (bot, message) => {
	if (bot.developers.includes(message.author.id)) {
		message.react("✅")
			.then(() => bot.destroy())
			.then(() => index.run());
	}
};
module.exports.help = {
	name: "restart",
	category: "Developer"
};