const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Conecta el bot al canal de voz'),
	inVoice : true,
	async execute(interaction, client) {

        const voiceJoined = await client.distube.voices.join(interaction.member.voice.channel);
		voiceJoined.setSelfDeaf(false);
		const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Listo")
                .setColor("#FFFFFF");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
};