const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'Nzk2Mzg5NTIxNDkxMDk5Njg4.X_XNig.3u8daSBHLyaBKoCrl1tpx-ZZ-q8';
const PREFIX = '#';
const memberCounter = require('./counter/member_counter');
const currentdata = require('./currentdata')
const rolemembercount = require('./rolemembercount')
        // Funkcjonalność BOTA
// #ping - sprawdzanie czy bot działa
// #clear [val]  - usuwanie danej ilości wiadomości
// Odświerzana ilość osób na DC
// Dodawanie rangi Obywatel
// Odświerzająca się data
// Ilość osób z rangą EMT
// Komenda zatrudnij pracownika
// Komenda zebranie 
// Komenda godzinki
// Komenda Help
// Komenda Zwolnij pracownika (zabranie rang i dodanie obywatela)
// komenda do WSR
// komenda do RRU
// komenda do MR
// komenda do AMS

        // Możliwe do zrobienia



bot.once('ready', () => {
    console.log('ReverBOT is online!');
    memberCounter(bot);
    currentdata(bot);
    rolemembercount(bot);
 });


 bot.on('guildMemberAdd', member => {

    var role = member.guild.roles.cache.find(role => role.name === "Obywatel");
    member.roles.add(role);

 })


 bot.on('message', msg=>{

        let args = msg.content.substring(PREFIX.length).split(" ");

        
        switch(args[0]){
            case 'ping':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT"))  return msg.reply('Nie masz uprawnień do tej komendy')
                    msg.reply('Obecny!');
            break;

            case 'help':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT"))  return msg.reply('Nie masz uprawnień do tej komendy')
                    msg.reply('```Komendy Bota! \n\n #ping - sprawdzanie czy bot działa \n\n #clear (ilość) - usuwanie danej ilości wiadomości (wartość bez nawiasów) \n\n #zebranie - wkleja info o zebraniu \n\n #godzinki - wkleja info o uzupełnieniu godzin \n\n #zatrudnij @User - Wstawia ogłoszenie,że osoba została zatrudniona i nadaje mu rangi Recruit oraz EMT \n\n #zwolnij @User - Usuwa wszystkie rangi użytkownika i nadaje mu Obywatela \n\n Bot sam odświerza Date serwera (co godzine), Sam odświerza ilość osób na DC (co wejście i wyjście na serwer jakiegoś użytkownika), oraz sam odświerza ilość osób z rangą EMT (co 24h)```');
            break;

            case 'clear':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                    if(!args[1]) return msg.reply('Błąd! Nie podano poprawnej ilości')
                    msg.channel.bulkDelete(args[1]);
            break;

            case 'zebranie':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                const datachannel = '762777229259440130'; //ID kanalu ogloszenia
                const channel = bot.channels.cache.get(datachannel);
                channel.send(`<@&668143898086080560> \n Zebranie w tą niedzielę o 21:00 \n Zbiórka 20:50 pod Eclipse \n Galówka i poza służbą \n Usprawiedliwienia nieobecności do 101-103 lub 201-202`);
            break;

            case 'godzinki':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                const datachannel1 = '762777229259440130'; //ID kanalu ogloszenia
                const channel1 = bot.channels.cache.get(datachannel1);
                channel1.send(`<@&668143898086080560> \n Przypominamy, że godzinki wypisujecie do Niedzieli godz 20:00 \n Wszelkie nie wpisane godziny do tego czasu przepadają`);
            break;

            case 'zwolnij':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')

                let member1 = msg.mentions.members.first(); // wspomnienie użytkownika

                msg.reply(`Zwolniłeś ${`<@`+member1+'> '} z pracy`);

                const rolesUser = member1.roles.cache.array();

                
                for (var i = 0; i < rolesUser.length - 1; i++){
                   member1.roles.remove(rolesUser[i]);
                }
   
                var roleObywatel = member1.guild.roles.cache.find(role => role.name === "Obywatel");
                member1.roles.add(roleObywatel);
            break;

            case 'zatrudnij':
                if(!msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')

                let member = msg.mentions.members.first(); // wspomnienie użytkownika

                const datachannel2 = '762783687820443668'; //ID kanalu przyjęte podania
                const channel2 = bot.channels.cache.get(datachannel2);
                channel2.send(`${`<@`+member+'> '}Twoje podanie zostało zaakceptowane. Proszę ustawić sobie Imię oraz Nazwisko IC jako pseudonim na DC. Prosimy się zgłosić na szpital do zarządu w celu wdrożenia w dalsze procedury.`);
                
                const datachannel21 = '677418037825110023'; //ID kanalu med OOC
                const channel21 = bot.channels.cache.get(datachannel21);
                channel21.send(`${`<@`+member+'> '}Twoje podanie zostało zaakceptowane. Proszę ustawić sobie Imię oraz Nazwisko IC jako pseudonim na DC oraz wypisać dane na kanale #e-mail-hex. Prosimy się zgłosić na szpital do zarządu w celu wdrożenia w dalsze procedury.`);
                

                var role1 = member.guild.roles.cache.find(role => role.name === "EMT");
                var role2 = member.guild.roles.cache.find(role => role.name === "Recruit");
                var role3 = member.guild.roles.cache.find(role => role.name === "Obywatel");

                member.roles.add(role1);
                member.roles.add(role2);
                member.roles.remove(role3);
                break;

            case 'WSR':
                if(!msg.member.roles.cache.find(role => role.name === "Training Division") && !msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')
    
                let memberwsr = msg.mentions.members.first(); // wspomnienie użytkownika
    
                const datachannelwsr = '762799020971130921'; //ID kanalu WSR
                const channelwsr = bot.channels.cache.get(datachannelwsr);
                channelwsr.send(`${`<@`+memberwsr+'> '}- Gratuluję zdania egzaminu teoretycznego i praktycznego. Z dniem dzisiejszym oficjalnie witam w jednostce Water Search & Rescue`);
                    
                var rolewsr = memberwsr.guild.roles.cache.find(role => role.name === "Water Search & Rescue");
                var rolenurek = memberwsr.guild.roles.cache.find(role => role.name === "Licencja Nurka");
                var rolesternik = memberwsr.guild.roles.cache.find(role => role.name === "Licencja Sternicza");
                memberwsr.roles.add(rolewsr);
                memberwsr.roles.add(rolenurek);
                memberwsr.roles.add(rolesternik);

            break;

            case 'MR':
                if(!msg.member.roles.cache.find(role => role.name === "Training Division") && !msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')
        
                let membermr = msg.mentions.members.first(); // wspomnienie użytkownika
        
                const datachannelmr = '762798946224832532'; //ID kanalu MR
                const channelmr = bot.channels.cache.get(datachannelmr);
                channelmr.send(`${`<@`+membermr+'> '} gratuluję przejścia pozytywnie egzaminu z teorii oraz praktyki, tym samy zdobycia licencji Patrol Unit.`);
                      
                var rolemr = membermr.guild.roles.cache.find(role => role.name === "Mountain Rescue");
                var rolepu = membermr.guild.roles.cache.find(role => role.name === "Patrol Unit");
                membermr.roles.add(rolemr);
                membermr.roles.add(rolepu);
    
            break;

            case 'AMS':
                if(!msg.member.roles.cache.find(role => role.name === "Training Division") && !msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')
            
                let memberams = msg.mentions.members.first(); // wspomnienie użytkownika
            
                const datachannelams = '763081821104898149'; //ID kanalu AMS
                const channelams = bot.channels.cache.get(datachannelams);
                channelams.send(`${`<@`+memberams+'> '} -  Gratuluje dołączenia do jednostki AMS oraz uzyskania Licencji Pilota! Tym samym zaliczenia egzaminu z teorii oraz praktyki!`);
                            
                var roleams = memberams.guild.roles.cache.find(role => role.name === "Air Medical Services");
                var rolepilot = memberams.guild.roles.cache.find(role => role.name === "Licencja Pilota");
                memberams.roles.add(roleams);
                memberams.roles.add(rolepilot);
        
            break;

            case 'RRU':
                if(!msg.member.roles.cache.find(role => role.name === "Training Division") && !msg.member.roles.cache.find(role => role.name === "EMT Board") && !msg.member.roles.cache.find(role => role.name === "BOT")) return msg.reply('Nie masz uprawnień do tej komendy')
                if(!args[1]) return msg.reply('Błąd! Nie spingowano użytkownika')
                
                let memberrru = msg.mentions.members.first(); // wspomnienie użytkownika
                
                const datachannelrru = '762801320742092800'; //ID kanalu RRU
                const channelrru = bot.channels.cache.get(datachannelrru);
                channelrru.send(`${`<@`+memberrru+'> '} - Gratuluje dołączenia do jednostki RRU! Tym samym zaliczenia egzaminu z teorii oraz praktyki!`);
                                
                var rolerru = memberrru.guild.roles.cache.find(role => role.name === "Rapid Respons");
                memberrru.roles.add(rolerru);

            
            break;

            case 'kostka':
                const liczba = Math.floor(Math.random() * 6) + 1; ;
                msg.reply('Wylosowana liczba to: ' + liczba);
            break;
     }

 })

 bot.login(token);
