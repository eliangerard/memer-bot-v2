const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grab')
        .setDescription('Te envía el link de la canción por privado'),
    inVoice : true,
    voiceCommand : ['agarrar'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if(!queue)
            return interaction.reply({content: "No se está reproduciendo nada", ephemeral: true});

        interaction.user.send(queue.currentLink);
        return interaction.reply({content: "tulún :)", ephemeral: true});
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if(!queue)
            return msg.author.send('No se está reproduciendo nada');

        return msg.author.send(client.distube.getQueue(msg.guild).currentLink);
    }
};