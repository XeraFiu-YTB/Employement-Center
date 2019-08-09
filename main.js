const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const bot = new Discord.Client();




bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');
    if (jsFile.length <= 0) {
        console.log('Je ne trouve pas la commande');
        return;
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});


bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne ! `);
    bot.user.setActivity('..help', { type: 'Listening', url: "https://www.youtube.com/watch?v=QMPdfLxWmgI"  });
    //bot.user.setStatus("online"); //online idle dnb
});



bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
//process.env.PREFIX à la place de config.prefix si cela ne marche pas (heroku)
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

});

bot.on('message', (message) => {
    var a = 1
    let channelLink = message.channel.id //channel ou le lien vient d'etre écrit
    //let channelAcceptedID = [609340258558935040, 609339643464253441]
    
    if(!(message.member == null || message.member.hasPermission('MANAGE_MESSAGES') || channelLink == '609340258558935040' || channelLink =='609339643464253441')){ //si c'est un modo le lien n'est pas sup
              

        if (message.content.includes("https://")) {
        console.log("Lien delete https :" + message.content + " from " + message.member)
        message.delete(1);
        
        var a = 2
        }
        
        if (message.content.includes("http://")) {
        console.log("Lien delete http :" + message.content + " from " + message.member)
        message.delete(1);
        
        var a = 2
        }

        if (message.content.includes("www.")) {
        console.log("Lien delete www :" + message.content + " from " + message.member)
        message.delete(1);
        var a = 2
        }

        if(a == 2 ){ 
            message.member.sendMessage("Pas de lien ici, " + message.member)
        let inviteEmbed = new Discord.RichEmbed()
                .setDescription("Invitation")
                .setColor("#dc143c")
                .addField("Utilisateur ayant envoyé un lien",`${"<@" + message.member.id + ">"}`)
                .addField("Canal", message.channel)
                .addField("Message", message.content);
        let inviteReport = message.guild.channels.get('609339618835300352');//ID du salon reports
            if (!inviteReport) {
                return message.channel.send("Canal 'reports' introuvable. Veillez créer ce canal !");
            }   
    
        
        inviteReport.send(inviteEmbed)};
    }
});


bot.on("guildMemberAdd", (member) => {

   member.sendMessage("Bienvenue sur **Employement Center** ici tu peux chercher du **Staff** compétent qui correspond à tes ambitions !")
    
    
    
});

//process.env.TOKEN si heroku
bot.login(config.token);

