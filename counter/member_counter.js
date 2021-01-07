module.exports = bot => {
    const chanelId = '796783042110685184'
    const serverId = '662311224528207883'

    const updateMembers = guild =>{
        const channel = guild.channels.cache.get(chanelId)
        channel.setName(`Ilość osób: ${guild.memberCount.toLocaleString()}`)
    }
    
    bot.on(`guildMemberAdd`, (member) => updateMembers(member.guild))
    bot.on(`guildMemberRemove`, (member) => updateMembers(member.guild))

    const guild = bot.guilds.cache.get(serverId)
}


