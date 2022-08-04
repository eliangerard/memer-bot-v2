const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, getGroups, joinVoiceChannel } = require('@discordjs/voice');
const { addSpeechEvent } = require("discord-speech-recognition");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Conecta el bot al canal de voz'),
	inVoice : true,
	async execute(interaction, client) {

        const voiceJoined = await client.distube.voices.join(interaction.member.voice.channel);
		voiceJoined.setSelfDeaf(false);
		await interaction.reply({content: 'Listo para escucharte :)', ephemeral: true });
	},
};