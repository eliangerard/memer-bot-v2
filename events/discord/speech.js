module.exports = {
	name: 'speech',
	once: false,
	async execute(msg, client) {
        const user = msg.author.username + msg.author.discriminator;
		console.log(`${user}: ${msg.content}`);
        if (!msg.content) return;
		msg.content = msg.content.toLowerCase();
		const content = msg.content.split(' ');
		if(!client.config.voicePrefix.includes(content.shift()))
			return;
		
		const voiceCommand = content.shift();
		console.log(`Comando dicho: ${voiceCommand}`);
		const command = client.commands.find(command => command.voiceCommand == voiceCommand );
		if(!command)
			return;

		console.log(command.voiceCommand);
		try {
    		await command.executeVoice(content.join(' '), msg, client);
	    } catch (error) {
		    console.error(error);
	    }
	},
};