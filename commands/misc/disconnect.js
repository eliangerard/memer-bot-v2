const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Desconecta el bot del canal de voz'),
	inVoice : true,
	voiceCommand : ['salte', 'desconéctate'],
	async execute(interaction, client) {

        const voiceJoined = await client.distube.voices.get(interaction.member.voice.channel);
		voiceJoined.leave();
		const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Adiós")
                .setColor("#FFFFFF");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });

	},
};