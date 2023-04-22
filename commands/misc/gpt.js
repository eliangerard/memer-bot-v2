const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Envía un mensaje a chat gpt')
        .addStringOption(option => option.setName('query').setDescription('Tu mensaje').setRequired(true)),
    inVoice: false,
    voiceCommand: ['chat'],
    async execute(interaction, client) {
        const { ChatGPTUnofficialProxyAPI } = await import('chatgpt');
        const query = interaction.options.getString('query');

        const api = new ChatGPTUnofficialProxyAPI({
            accessToken: client.config.gptAccessToken,
            apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
        })

        const res = await api.sendMessage(query)

        return interaction.editReply({ content: res.text, ephemeral: false });
    },
    async executeVoice(content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue)
            return msg.author.send('No se está reproduciendo nada');

        return msg.author.send(queue.songs[0].url);
    }
};