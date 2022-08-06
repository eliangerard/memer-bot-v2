const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
        .setDescription('Activa la repetición de, la queue o la canción')
        .setRequired(true)
        .addIntegerOption(option =>
            option.setName('mode')
                .setDescription('El modo de repetición')
                .setRequired(true)
                .addChoices(
                    { name: 'apagado', value: 0 },
                    { name: 'canción', value: 1 },
                    { name: 'queue', value: 2 },
        )),
    inVoice : false,
    voiceCommand : ['loop', 'repite'],
	async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return interaction.editReply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        let mode = interaction.options.getInteger('mode');
        mode = queue.setRepeatMode(mode);
        mode = mode ? mode === 2 ? "Repitiendo la cola" : "Repitiendo la canción" : "Apagado";
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.repeat + " Loop")
            .setColor("#FFFFFF")
            .setDescription(`Modo de repetición establecido: \`${mode}\``)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });
        return interaction.editReply({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
    async executeVoice (content, msg, client) {
        let mode = content == "apagar" ? 0 : content == "canción" ? 1 : content == "cola" ? 2 : 3;
        if(mode == 3) return;
        const queue = client.distube.getQueue(msg.guild);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter({ text : 'Memer', iconURL : client.botURL });

            return client.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        mode = queue.setRepeatMode(mode);
        mode = mode ? mode === 2 ? "Repitiendo la cola" : "Repitiendo la canción" : "Apagado";
        const embed = new EmbedBuilder()
            .setTitle(client.emotes.repeat + " Loop")
            .setColor("#FFFFFF")
            .setDescription(`Modo de repetición establecido: \`${mode}\``)
            .setTimestamp()
            .setFooter({ text : 'Memer', iconURL : client.botURL });
        return client.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
};