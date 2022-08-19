const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');

const download = (uri, filename, callback) => {
    request.head(uri, function(err, res, body){
        if(err) throw new Error(err);
        request(uri).pipe(fs.createWriteStream(`./resources/${filename}`)).on('close', callback);
    });
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Descarga un video de alguna red social')
        .addStringOption(option => option.setName('link').setDescription('El link del video que quieres descargar').setRequired(true)),
	inVoice : false,
	async execute(interaction, client) {
        const link = interaction.options.getString('link');

        const url = 'https://socialdownloader.p.rapidapi.com/api/facebook/video?video_link='+encodeURIComponent(link);

        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': client.config.apis.rapidapikey,
            'X-RapidAPI-Host': 'socialdownloader.p.rapidapi.com'
            }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(async json => {
            console.log(json);
            if(json.body.videoHD)
                download(json.body.videoHD, 'video.mp4', async ()=>{
                    return await interaction.editReply({
                        files: [{
                            attachment: './resources/video.mp4',
                            name: 'video.mp4'
                        }]
                    }).catch(error => {
                        console.log(error);
                        download(json.body.video, 'video.mp4', async ()=>{
                            await interaction.editReply({
                                files: [{
                                    attachment: './resources/video.mp4',
                                    name: 'video.mp4'
                                }]
                            }).catch(error => interaction.editReply("El video pesa mucho y no se armó con discord no dió chance"));
                        });
                    });
                })
            else 
                download(json.body.video, 'video.mp4', async ()=>{
                    await interaction.editReply({
                        files: [{
                            attachment: './resources/video.mp4',
                            name: 'video.mp4'
                        }]
                    }).catch(error => interaction.editReply("El video pesa mucho y no se armó con discord no dió chance"));
                });
                
        })
        .catch(err => interaction.editReply(`No se pudo descargar el video: ${err}`));
    },
};