const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('np')
        .setDescription('Muestra lo que se está reproduciendo en este momento'),
    inVoice : true,
    voiceCommand : ['cuál','cual'],
    voiceParams : false,
	async execute(interaction, client) {
        const queue = client.distube.getQueue(message)
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.play + " Reproduciendo")
                .setColor("#FFFFFF")
                .addFields(
                    { name: "Canción: ", value: queue.songs[0].name },
                    { name: "Duración: ", value: queue.songs[0].formattedDuration, inline: true },
                    { name: "Tiempo: ", value: queue.songs[0].formattedCurrentTime, inline: true},
                    { name: "Solicitada por: ", value: "<@!" + queue.songs[0].user + ">", inline: true },
                    { name: "Ajustes: ", value: client.distube.status(queue) }
                )
                .setThumbnail(queue.songs[0].thumbnail)
                .setTimestamp()
                .setFooter({text: 'Memer', iconURL: client.botURL});

            interaction.reply({ embeds: [embed] }).then(msg => {
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

            interaction.reply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(msg.guild)
        try {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.play + " Reproduciendo")
                .setColor("#FFFFFF")
                .addFields(
                    { name: "Canción: ", value: queue.songs[0].name },
                    { name: "Duración: ", value: queue.songs[0].formattedDuration, inline: true },
                    { name: "Tiempo: ", value: queue.songs[0].formattedCurrentTime, inline: true},
                    { name: "Solicitada por: ", value: "<@!" + queue.songs[0].user + ">", inline: true },
                    { name: "Ajustes: ", value: client.distube.status(queue) }
                )
                .setThumbnail(queue.songs[0].thumbnail)
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