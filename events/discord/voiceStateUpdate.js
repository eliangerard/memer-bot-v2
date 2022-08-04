module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(oldState, newState, client) {
        console.log('hola');
        const voiceConnection = client.distube.voices.get(newState.channel);
		if(newState.member == newState.guild.members.me && newState.channel != null && voiceConnection.selfDeaf){
            voiceConnection.setSelfDeaf(false);
        }
	},
};