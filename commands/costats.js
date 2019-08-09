const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let totalMember = message.guild.memberCount
let totalMemberOFF = message.guild.members.filter(m => m.presence.status === 'offline').size
let totalMemberDND = message.guild.members.filter(m => m.presence.status === 'dnd').size
let totalMemberAWAY = message.guild.members.filter(m => m.presence.status === 'away').size
let totalMemberON = message.guild.members.filter(m => m.presence.status === 'online').size

let costatsEmbed = new Discord.RichEmbed()
        .setDescription('Informations sur le serveur')
        .setColor('#dc143c')
        .setThumbnail(servIcon)
        .addField('Total', totalMember)
        .addField('Online', totalMemberON)
        .addField('Jaune', totalMemberAWAY)
        .addField('Dnd', totalMemberDND)
        .addField('offline', totalMemberOFF)

        return message.channel.send(costatsEmbed);

}

module.exports.help = {
    name: "costats"
}
