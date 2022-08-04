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
					
            client.channel = interaction.channel;
    		await command.execute(interaction, client);
	    } catch (error) {
		    console.error(error);
    		await interaction.reply({ content: 'Hubo un error con este comando', ephemeral: true });
	    }
	},
};