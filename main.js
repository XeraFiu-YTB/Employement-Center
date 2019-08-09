const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const bot = new Discord.Client();


bot.on('messageReactionAdd', (reaction, user) => {
	console.log(`${user.username} a fait "${reaction.emoji.name}" dans ${reaction.channel}`);
});

bot.commands = new Discord.Collection();
bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`Ce serveur à ${guild.memberCount} membres!`);
    bot.user.setActivity(`${bot.guilds.size} Serveurs !`, { type: 'WATCHING'});
});

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
    let channelAcceptedID = [609340258558935040, 609339643464253441]
    console.log(`Il y a ${channelAcceptedID.length} salons qui sont acceptés`)
    if(!(message.member == null || channelLink == channelAcceptedID)){ //si c'est un modo le lien n'est pas sup
              

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

function couleur() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on("guildMemberAdd", (member) => {

   member.sendMessage("Bienvenue sur Fortool voici 1 minute de vidéo pour vous présenter le serveur: https://www.youtube.com/watch?v=3E-_CyzKVv4&feature=youtu.be")
    
    let botsRole = member.guild.roles.find('id', '545386430801772603')
    botsRole.setColor(couleur())
      //role.get(545386430801772603).setColor(color())
      //message.guild.roles.find('name', 'Bots').setColor(color())
    
    
  //  let role = member.guild.roles.find(x => x.name === "Joueur_Commun")
    //member.addRole(role.id)
    //guild.channels.find("id", "591938889132933121").setName(`Membres : ${guild.memberCount}`);
    //let channel = client.channels.get('591938889132933121');
    
});

//process.env.TOKEN si heroku
bot.login(config.token);

