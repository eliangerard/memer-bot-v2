const fs = require('node:fs');
const path = require('node:path');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { addSpeechEvent } = require("discord-speech-recognition");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.config = require("./config.json")
client.botURL = client.config.botURL;
client.apis = client.config.apis;
client.emotes = client.config.emoji
//const uri = client.config.mongodb.stringKey
//client.mongo = new MongoClient(uri);

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
    ]
});
SpeechOptions = { 
    group: client.config.clientId, 
    lang: client.config.lang, 
};

if(client.config.speechAPI.length > 0)
    SpeechOptions.key = client.config.speechAPI;

addSpeechEvent(client, SpeechOptions );

client.distube.status = queue => `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(", ") || "Off"}\` | Repitiendo: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda la cola" : "Esta canción" : "Nada"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

const getFiles = (dirName) => {
    let files = [];
    const items = fs.readdirSync(dirName, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            files = [
                ...files.filter(file => file.endsWith('.js')),
                ...(getFiles(`${dirName}/${item.name}`)),
            ];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    })

    return files;
};


client.commands = new Collection();
const commandFiles = getFiles('commands');
console.log(commandFiles);

commandFiles.forEach(file => {
	const filePath = path.join(__dirname, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
});

const eventsPath = path.join(__dirname, 'events/discord');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name,(...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
});

const distubePath = path.join(__dirname, 'events/distube');
const distubeEvents = fs.readdirSync(distubePath).filter(file => file.endsWith('.js'));
distubeEvents.forEach(file => {
	const filePath = path.join(distubePath, file);
	const event = require(filePath);
    console.log(event.name);
    client.distube.on(event.name, (...args) => event.execute(...args, client));
});

client.login(client.config.token);