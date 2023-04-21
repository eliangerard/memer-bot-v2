const { SlashCommandBuilder } = require('discord.js');

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
            'Authorization': 'Bearer ' + client.config.apis.gpt
        };

        let config = {
            method: 'POST',
            headers: headers,
            body: data
        };
        
        let response = await fetch(url, config)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));
        
        return interaction.editReply({ content: response.choices[0].message.content, ephemeral: false });
    },
    async executeVoice(content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue)
            return msg.author.send('No se está reproduciendo nada');

        return msg.author.send(queue.songs[0].url);
    }
};