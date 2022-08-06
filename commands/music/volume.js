const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
        .setDescription('Cambia el volumen de la reproducción')
        .addIntegerOption(option => option.setName('porcentaje').setDescription('Porcentaje del volumen').setRequired(true)),
    inVoice : true,
    voiceCommand : ['volumen'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        const volume = interaction.options.getInteger('porcentaje');
        queue.setVolume(volume);
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Volumen actualizado")
            .setColor("#FFFFFF")
            .setDescription(`Establecido en: \`${volume}\``)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });

        return interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
    async executeVoice (content, msg, client) {
        if(isNaN(content))
            return;
        const queue = client.distube.getQueue(msg.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        const volume = Number(content);
        queue.setVolume(volume);
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Volumen actualizado")
            .setColor("#FFFFFF")
            .setDescription(`Establecido en: \`${volume}\``)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });

        return client.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};