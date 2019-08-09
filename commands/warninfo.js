const Discord = require("discord.js");
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync('./warns.json'))
module.exports.run = async (bot, message, args) => {

if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .setColor(255, 0, 0)
            .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)

}



module.exports.help = {
    name: "warninfo"
}