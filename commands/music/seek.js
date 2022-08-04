const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
        .setDescription('Salta al segundo que indiques')
        .addIntegerOption(option => option.setName('segundos').setDescription('Segundos a los que se tiene que saltar la reproducción').setRequired(true)),
    inVoice : true,
    voiceCommand : ['segundo'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        const seconds = interaction.options.getInteger('segundos');
        if (!queue) {
            const embed = new EmbedBuilder()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("No se está reproduciendo nada")
            .setTimestamp()
            .setFooter({ text: 'Memer', iconURL: client.botURL })
            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        queue.seek(seconds);
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Seek")
            .setColor("#FFFFFF")
            .setDescription(`Saltando a ${seconds}!`)
            .setTimestamp()
            .setFooter({ text: 'Memer', iconURL: client.botURL });

        return interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if(isNaN(content)) return;
        const seconds = Number(content);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error+" Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text: 'Memer', iconURL: client.botURL })
            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        queue.seek(seconds);
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Seek")
            .setColor("#FFFFFF")
            .setDescription(`Saltando a ${seconds}!`)
            .setTimestamp()
            .setFooter({ text: 'Memer', iconURL: client.botURL });

        return client.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};