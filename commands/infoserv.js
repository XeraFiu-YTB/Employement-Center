const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.delete(1)

    let servIcon = message.guild.iconURL
    let servEmbed = new Discord.RichEmbed()
        .setDescription('Informations sur le serveur')
        .setColor('#dc143c')
        .setThumbnail(servIcon)
        .addField("Owner", message.guild.owner)
        .addField('Nom du serveur', message.guild.name)
        .addField("Region", message.guild.region)
        .addField('Nombre de membres', message.guild.memberCount)
        .addField('Bots', message.guild.members.filter(message => message.user.bot === true).size)
        .addField("Channels", message.guild.channels.size)
        .addField("Roles", message.guild.roles.size)
        .addField('Crée le', message.guild.createdAt)
        

        return message.channel.send(servEmbed);

    
}

module.exports.help = {
    name: "infoserv"
}
