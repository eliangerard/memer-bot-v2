const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
        .setDescription('Detiene la reproducción y borra la cola'),
    inVoice : true,
    voiceCommand : ['cállate', 'detente'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
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
        queue.stop()
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.stop+" Detenido")
            .setColor("#FFFFFF")
            .setDescription("Se ha detenido la reproducción")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});

        return interaction.reply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
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
        queue.stop()
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.stop+" Detenido")
            .setColor("#FFFFFF")
            .setDescription("Se ha detenido la reproducción")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});

        return client.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};