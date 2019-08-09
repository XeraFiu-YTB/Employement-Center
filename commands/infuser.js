const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first() || message.member
    let user = message.mentions.users.first() || message.author;
message.delete(1)
    let userIcon = user.displayAvatarURL
    let userEmbed = new Discord.RichEmbed()
        .setDescription(`Informations sur ${user}`)
        .setThumbnail((user.displayAvatarURL))
        .setColor('#dc143c')
        .setThumbnail(userIcon)
        .addField('Nom', user.username)
        .addField('Discrimant', `#${user.discriminator}`)
        .addField('ID', user.id)
        .addField('Status', user.presence.status)
        .addField("Game", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Pas de jeux"}`)
        .addField('Compte crée le', user.createdAt)
        .addField(`Rejoint ${message.guild.name} le `, member.joinedAt)
        .addField('Roles:', member.roles.map(r => `${r}`).join(' | '))
        setTimestamp()

        return message.channel.send(userEmbed);

    
}

module.exports.help = {
    name: "infuser"
}
