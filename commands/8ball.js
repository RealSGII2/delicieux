module.exports = {
	run: async (bot, message) => {
		var responses = ["no.", "highly unlikely.", "very doubtful.", "you wish.", "don't count on it.", "probably.", "most definitely.", "yes.", "highly likely.", "of course."
			, "ask again later.", "outlook not so good, retry.", "ask again later.", "better not tell you now."];
		var randomchoice = Math.floor(Math.random() * responses.length);
		message.reply(`:crystal_ball: The 8ball says... ${responses[randomchoice]} :crystal_ball:`).catch(() => bot.safeSend(message, module.exports.help.name));
	},
	help: {
		name: "8ball",
		category: "Fun"
	}
};