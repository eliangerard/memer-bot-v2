const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'error',
	execute(channel, e) {
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.error + " Error")
            .setColor("#FF0000")
            .setDescription("Descripción: " + e)
            .setTimestamp()
            .setFooter({text:'Memer', iconURL: client.botURL})
        channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        })    
        console.error(e)
	},
};