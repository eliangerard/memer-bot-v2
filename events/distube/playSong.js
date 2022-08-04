const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'playSong',
	execute(queue, song, client) {
    queue.setVolume(100);
    const embed = new EmbedBuilder()
      .setTitle(client.emotes.play + " Reproduciendo")
      .setColor("#FFFFFF")
      .addFields(
        { name: "Canción: ", value: song.name },
        { name: "Duración: ", value: song.formattedDuration, inline: true },
        { name: "Solicitada por: ", value: "<@!" + song.user + ">", inline: true },
        { name: "Ajustes: ", value: client.distube.status(queue) }
      )
      .setThumbnail(client.config.cdGif)
      .setImage(queue.songs[0].thumbnail)
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