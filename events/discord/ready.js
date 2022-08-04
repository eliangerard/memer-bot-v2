const { addSpeechEvent } = require("discord-speech-recognition");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		addSpeechEvent(client, { group: client.user.id , lang: client.config.lang });
	},
};