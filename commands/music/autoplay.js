const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autoplay')
        .setDescription('Activa o desactiva el modo autoplay'),
    inVoice : true,
    voiceCommand : ['autoplay'],
	async execute(interaction, client, voice) {
        const queue = client.distube.getQueue(message);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            return interaction.reply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const autoplay = queue.toggleAutoplay()
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" AutoPlay")
                .setColor("#FFFFFF")
                .setDescription(`Estado: \`${autoplay ? "Encendido" : "Apagado"}\``)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            return interaction.reply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("Descripción: "+e)
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL: client.botURL });

            return interaction.reply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
	},
    async executeVoice(content, message, client) {
        const queue = client.distube.getQueue(message.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const autoplay = queue.toggleAutoplay()
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" AutoPlay")
                .setColor("#FFFFFF")
                .setDescription(`Estado: \`${autoplay ? "Encendido" : "Apagado"}\``)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("Descripción: "+e)
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL: client.botURL });

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
	},
};