module.exports = {
	name: 'interactionCreate',
    once: false,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;
        
	    const command = client.commands.get(interaction.commandName);

	    if (!command) return;

    	try {
			await interaction.deferReply();
			if(command.inVoice){
				if(interaction.member.voice.channel === undefined)
						return interaction.editReply({ content: 'No estás en un canal de voz', ephemeral:true });
				let voiceConnection;
				
				if(!interaction.guild.members.me.voice.channel)
					voiceConnection = await client.distube.voices.join(interaction.member.voice.channel);
				else
					voiceConnection = await client.distube.voices.get(interaction.member.voice.channel);

				voiceConnection.setSelfDeaf(false);
			}
			client.channel = interaction.channel;
			await command.execute(interaction, client);
	    } catch (error) {
		    console.error(error);
    		await interaction.editReply({ content: 'Hubo un error con este comando', ephemeral: true });
	    }
	},
};