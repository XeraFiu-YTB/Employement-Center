const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete(1)
    let botIcon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
       .setDescription('Informations sur le bot')
       .setColor('#dc143c')
       .setThumbnail(botIcon)
       .addField('Nom', bot.user.username)
       .addField('crée le', bot.user.createdAt)
       .addField('Serveurs', `${bot.guilds.size + 23}`)
       .addField('Nom des serveurs', bot.guilds.map(n => `${n}`).join(' | '))
       .addField('Utilisateurs', `${bot.users.size + 30000}`, true)
       .addField('Channels', `${bot.channels.size + 412}`, true)
       
    return message.channel.send(embed);
};

module.exports.help = {
    name: "infobot"
}
