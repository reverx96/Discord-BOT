module.exports = async (bot) => {

    const guild = bot.guilds.cache.get('662311224528207883') //ID servera
    setInterval(() =>{
        let roleID = '668143898086080560';
        let memberCount = guild.roles.cache.get(roleID).members.size;

        const datachannel = '796783066663485521';
        const channel = guild.channels.cache.get(datachannel);
        channel.setName(`EMT: ${memberCount.toLocaleString()}`);
        console.log('EMT Update');
    }, 1800000); //86 400 000 dzień
}


