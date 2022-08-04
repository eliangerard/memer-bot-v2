const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'addSong',
	execute(queue, song, client) {
        if(queue.songs.length == 0) return;
        
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.success + " Añadiendo")
            .setColor("#FFFFFF")
            .setDescription(`${song.name} - \`${song.formattedDuration}\` | añadida por: ${song.user}`)
            .setTimestamp()
            .setFooter({text:'Memer', iconURL: client.botURL});

        if(!client.interaction)
            return client.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });

        return client.interaction.editReply({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
};