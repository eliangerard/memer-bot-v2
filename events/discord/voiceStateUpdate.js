module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(oldState, newState, client) {
        console.log(newState.channelId);
		if(newState.member == newState.guild.members.me && newState)
            console.log('Watching u');
	},
};