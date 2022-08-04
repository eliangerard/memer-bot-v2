const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
        .setDescription('Pausa y resume la reproducción de la música'),
    inVoice : true,
    voiceCommand : ['pausa'],
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
        if (queue.paused) {
            queue.resume()
            const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Resume")
            .setColor("#FFFFFF")
            .setDescription("Reanudando reproducción")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});
            
            return interaction.reply( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            }); 
        }
        queue.pause()
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Pause")
            .setColor("#FFFFFF")
            .setDescription("Pausando reproducción")
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
        if (queue.pause) {
            queue.resume()
            const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Resume")
            .setColor("#FFFFFF")
            .setDescription("Reanudando reproducción")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});
            
            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            }); 
        }
        queue.pause()
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success+" Pause")
            .setColor("#FFFFFF")
            .setDescription("Pausando reproducción")
            .setTimestamp()
            .setFooter({text: 'Memer', iconURL: client.botURL});
            
        return client.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};