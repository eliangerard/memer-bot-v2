const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
        .setDescription('Saltea la canción que se esté reproduciendo'),
    inVoice : true,
    voiceCommand : ['siguiente', 'skip'],
	async execute(interaction, client) {
        interaction.deferReply();
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(`${client.emotes.error} Error`)
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL: client.botURL })
            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Skip")
                .setColor("#FFFFFF");

            interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });

            if(queue.songs.length == 1)
                return queue.stop();
            queue.skip();
        } catch (e) {
            const embed = new EmbedBuilder()
            .setTitle(`${client.emotes.error} Error`)
            .setColor("#FF0000")
            .setDescription(`Descripción: ${e}`)
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});

            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
	},
    async executeVoice(content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(`${client.emotes.error} Error`)
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL: client.botURL })
            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Skip")
                .setColor("#FFFFFF");

            client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });

            if(queue.songs.length == 1)
                return queue.stop();
            queue.skip();
        } catch (e) {
            const embed = new EmbedBuilder()
            .setTitle(`${client.emotes.error} Error`)
            .setColor("#FF0000")
            .setDescription(`Descripción: ${e}`)
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});

            client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
    }
};