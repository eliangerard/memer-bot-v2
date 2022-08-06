const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
        .setDescription('Muestra la lista de reproducción del bot'),
    inVoice : false,
    voiceCommand : ['cola', 'lista'],
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
        const q = queue.songs.map((song, i) => `${i === 0 ? "Reproduciendo:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.queue+" Cola")
            .setColor("#FFFFFF")
            .setDescription(`${q}`)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });
        
        return interaction.editReply( { embeds: [embed] } ).then(msg => {
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
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return client.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }        
        const q = queue.songs.map((song, i) => `${i === 0 ? "Reproduciendo:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.queue+" Cola")
            .setColor("#FFFFFF")
            .setDescription(`${q}`)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });
        
        return client.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};