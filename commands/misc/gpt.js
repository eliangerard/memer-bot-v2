const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Envía un mensaje a chat gpt'),
    inVoice: false,
    voiceCommand: ['chat'],
    async execute(interaction, client) {
        let data = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "Act as a translator."
                },
                {
                    "role": "user",
                    "content": "Translate 'door' into german."
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
        
        let response = await fetch(url, config);
        let result = await response.json();

        return interaction.editReply({ content: result.choices[0].message.content, ephemeral: true });
    },
    async executeVoice(content, msg, client) {
        const queue = client.distube.getQueue(msg.guild);
        if (!queue)
            return msg.author.send('No se está reproduciendo nada');

        return msg.author.send(queue.songs[0].url);
    }
};