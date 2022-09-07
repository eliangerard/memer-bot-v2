const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

let page;
let totalPages;
let q;
let header;
const status = queue => `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(", ") || "Off"}\` | Repitiendo: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda la cola" : "Esta canción" : "Nada"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

const updateQueue = (queue) => {
    header = `**Reproduciendo:** ${queue.songs[0].name} - \`${queue.songs[0].formattedDuration}\`\n ${status(queue)}`;
    q = ``;
    for(let i = page*10+1; i < (queue.songs.length > (page*10)+11 ? page*10+11 : queue.songs.length); i++)
        q += `**${i}.** ${queue.songs[i].name} - \`${queue.songs[i].formattedDuration}\`\n`;
    q += `\n*Página: ${(page+1)+"/"+totalPages}*`;
}

const handler = (reaction, user) => {
    if(reaction.message.id == msg.id && !user.bot){
        if(reaction.emoji.name == "✅"){                        
            client.removeListener('messageReactionAdd', handler)
            return msg.delete();
        }    
        if(reaction.emoji.name == "➡️"){
            if(page == totalPages-1) page = 0;
            else page++;
            updateQueue(queue);
        }
        if(reaction.emoji.name == "⬅️"){
            if(page == 0) page = totalPages-1;
            else page--;
            updateQueue(queue);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.queue+" Cola")
        .setColor("#FFFFFF")
        .setDescription(`${header}`)
        .addField("En la lista:", `${q}`)
        .setTimestamp()
        .setFooter('Memer', client.botURL);

        msg.edit({ embeds: [embed] });
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
        .setDescription('Muestra la lista de reproducción del bot'),
    inVoice : false,
    voiceCommand : ['cola', 'lista'],
	async execute(interaction, client) {
        const queue = await client.distube.getQueue(interaction.guild);
        page = 0;
        if(!queue?.songs)
            interaction.editReply("No se está reproduciendo nada");
        totalPages = Math.ceil(queue.songs.length/10);
        if(args.length > 1) return;
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
        updateQueue(queue);

        const embed = new EmbedBuilder()
            .setTitle(client.emotes.queue+" Cola")
            .setColor("#FFFFFF")
            .setDescription(`${header}`)
            .addFields({ name: "En la lista:", value: `${q}` })
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            msg.react('⬅️');
            msg.react('➡️');
            msg.react('✅');
            client.on('messageReactionAdd', handler); 
        });
	},
    async executeVoice (content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        page = 0;
        totalPages = Math.ceil(queue.songs.length/10);
        if(args.length > 1) return;
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
        updateQueue(queue);

        const embed = new EmbedBuilder()
            .setTitle(client.emotes.queue+" Cola")
            .setColor("#FFFFFF")
            .setDescription(`${header}`)
            .addFields({ name: "En la lista:", value: `${q}` })
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });

        client.channel.send( { embeds: [embed] } ).then(msg => {
            msg.react('⬅️');
            msg.react('➡️');
            msg.react('✅');
            client.on('messageReactionAdd', handler); 
        });
    }
};