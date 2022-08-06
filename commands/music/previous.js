const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('previous')
        .setDescription('Reproduce la canción anterior'),
    inVoice : true,
    voiceCommand : ['anterior', 'regresa'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL : client.botURL });

            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            queue.previous();
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Reproduciendo canción anterior")
                .setColor("#FFFFFF");
            interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("Descripción: "+e)
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL : client.botURL });

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            queue.previous();
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.success+" Reproduciendo canción anterior")
                .setColor("#FFFFFF");
            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("Descripción: "+e)
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
    }
};