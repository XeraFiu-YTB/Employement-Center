const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("Vous n'avez pas les permissions de valider !")
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
message.delete(1)
    
    let valideRole = message.guild.roles.find(x => x.id === '559308469279260682')
    
    
message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(valideRole))
message.channel.send(`Votre Staff ${message.author} vient de vous valider pour une durée de 5h30 !`)
    }
}
    module.exports.help = {
    name: "valid"
}