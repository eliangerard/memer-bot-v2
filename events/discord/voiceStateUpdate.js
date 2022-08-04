module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(oldState, newState, client) {
		if(newState.member == newState.guild.members.me && newState.channel != null)
            console.log(getVoiceConnection(interaction.guildId) + " - " + getGroups().forEach(value => console.log(value)));
		    addSpeechEvent(client, { group: '1004267879933415444',lang: client.config.lang });
	},
};