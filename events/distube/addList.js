const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'addList',
	execute(queue, playlist, client) {
        console.log('playlist añadida');
        const embed = EmbedBuilder()
            .setTitle(client.emotes.success + ` Añadiendo \`${playlist.name}\``)
            .setColor("#FFFFFF")
            .setDescription(`¡Playlist añadida!\n${client.distube.status(queue)}`)
            .setTimestamp()
            .setFooter({text:'Memer', iconURL: client.botURL})
        client.interaction.editReply({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        })    
	},
};