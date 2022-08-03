const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
        .setDescription('Reproduce una canción')
        .addStringOption(option => option.setName('canción').setDescription('Lo que quieras reproducir, puede ser una búsqueda o un link').setRequired(true)),
    inVoice : true,
    voiceCommand : ['reproduce'],
	async execute(interaction, client) {
        const song = interaction.options.getString('canción');
        interaction.deferReply();
        client.interaction = interaction;
        return client.distube.play(interaction.member.voice.channel, song, client);
	},
    async executeVoice (content, msg, client) {
        if(content.length == 0) return;
        client.interaction = null;
        return client.distube.play(msg.member.voice.channel, content, client);
    }
};