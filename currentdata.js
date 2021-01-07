module.exports = async (bot) => {

    const guild = bot.guilds.cache.get('662311224528207883') //ID servera
    setInterval(() =>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        const currentDate = dd+'-'+mm+'-'+yyyy;
        const datachannel = '796783016151351336';
        const channel = guild.channels.cache.get(datachannel);
        channel.setName(`Data: ${currentDate.toLocaleString()}`);
        console.log('Data Update ' + currentDate);
    }, 1800000);
}
