const { SlashCommandBuilder } = require('discord.js');
const HttpsProxyAgent = require('https-proxy-agent');
const proxy = 'http://109.254.37.40:9090';
const agent = new HttpsProxyAgent(proxy);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Envía un mensaje a chat gpt')
        .addStringOption(option => option.setName('query').setDescription('Tu mensaje').setRequired(true)),
    inVoice: false,
    voiceCommand: ['chat'],
    async execute(interaction, client) {
        const query = interaction.options.getString('query');
        let data = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "Eres un miembro de un servidor de discord muy gracioso y que usa un asento mexicano"
                },
                {
                    "role": "user",
                    "content": query
                }
            ]
        });

        let url = 'https://api.pawan.krd/v1/chat/completions';

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + client.config.gpt
        };

        let config = {
            method: 'POST',
            headers: headers,
            body: data,
            agent
        };
        console.log(client.config.gpt)
        let response = await fetch(url, config);
        console.log(response)
        let result = await response.json();
        console.log(result.choices[0].message.content);
        
        return interaction.editReply({ content: result.choices[0].message.content, ephemeral: false });
    },
    async executeVoice(content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue)
            return msg.author.send('No se está reproduciendo nada');

        return msg.author.send(queue.songs[0].url);
    }
};