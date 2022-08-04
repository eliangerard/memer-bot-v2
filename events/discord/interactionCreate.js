module.exports = {
	name: 'interactionCreate',
    once: false,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;
        
	    const command = client.commands.get(interaction.commandName);

	    if (!command) return;

    	try {
			if(command.inVoice && interaction.member.voice.channel === undefined)
					return interaction.reply({ content: 'No estás en un canal de voz', ephemeral:true });
			
			if(!interaction.guild.members.me.voice.channel){
				const voiceJoined = await client.distube.voices.join(interaction.member.voice.channel);
				voiceJoined.setSelfDeaf(false);
			}
            client.channel = interaction.channel;
    		await command.execute(interaction, client);
	    } catch (error) {
		    console.error(error);
    		await interaction.reply({ content: 'Hubo un error con este comando', ephemeral: true });
	    }
	},
};