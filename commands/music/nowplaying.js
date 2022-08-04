const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('np')
        .setDescription('Muestra lo que se está reproduciendo en este momento'),
    inVoice : false,
    voiceCommand : ['cuál','cual'],
    voiceParams : false,
	async execute(interaction, client) {
        interaction.deferReply();
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("No se está reproduciendo nada")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});

            return interaction.editReply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.play + " Reproduciendo")
                .setColor("#FFFFFF")
                .addFields(
                    { name: "Canción: ", value: queue.songs[0].name },
                    { name: "Duración: ", value: queue.formattedDuration, inline: true },
                    { name: "Tiempo: ", value: queue.formattedCurrentTime, inline: true},
                    { name: "Solicitada por: ", value: "<@!" + queue.songs[0].user + ">", inline: true },
                    { name: "Ajustes: ", value: client.distube.status(queue) }
                )
                .setThumbnail(client.botURL)
                .setImage(queue.songs[0].thumbnail)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            interaction.editReply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("" + e)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            interaction.editReply({ embeds: [embed] }).then(msg => {
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
            .setFooter({text: 'Memer', iconURL: client.botURL});

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.play + " Reproduciendo")
                .setColor("#FFFFFF")
                .addFields(
                    { name: "Canción: ", value: queue.songs[0].name },
                    { name: "Duración: ", value: queue.formattedDuration, inline: true },
                    { name: "Tiempo: ", value: queue.formattedCurrentTime, inline: true},
                    { name: "Solicitada por: ", value: "<@!" + queue.songs[0].user + ">", inline: true },
                    { name: "Ajustes: ", value: client.distube.status(queue) }
                )
                .setThumbnail(client.botURL)
                .setImage(queue.songs[0].thumbnail)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            client.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("" + e)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            console.error(e);
            client.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
    }
};