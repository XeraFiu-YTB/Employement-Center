const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("Vous n'avez pas les permissions de lancer le Jeux !");
    }

if(message.member.hasPermission("MANAGE_MESSAGES") && b == 1){
	message.delete(1)
         message.channel.send("Le Jeux vient d'être lancé, le nombre à trouver est entre 0 et 1000 !");
      var b = 2
    
var jeuxChannel = message.guild.channels.find(x => x.name === "🎮┆jeux")
var random = Math.floor(Math.random() * 1001);
message.member.sendMessage(`Le bon nombre est : ${random} dans le salon <#592388843710185482>`);
console.log("Le nombre est " + random)

bot.on('message', (message) => {

if (message.content == random) {
let jeuxEmbed = new Discord.RichEmbed()
                .setDescription("Jeux")
                .setColor("#dc143c")
                .addField("Winner :", `${"<@" + message.member.id + ">"}`)
                .addField(`Nombre :  ${random}`, "GG il gagne le grade Winner !")
                .setFooter('©Fortool - Game');


jeuxChannel.send(jeuxEmbed)
let winnerRole = message.guild.roles.find(x => x.name === 'Winner')
message.member.addRole(winnerRole.id)
var random = null
var b = 1

}
})

}

}


module.exports.help = {
    name: "jeux"
}