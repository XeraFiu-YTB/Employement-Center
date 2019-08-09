const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let mutedUser = message.member

    let partenaireRole = message.guild.roles.find(x => x.id === '584674943917228042')
    let preniumRole = message.guild.roles.find(x => x.id === '581822046087020555')
    let attenteRole = message.guild.roles.find(x => x.id === '592312461441499136');
if(!preniumRole) {
    message.channel.send("Tu n'as pas la Perm, ceci est disponible pour les Preniums")
}
if(!partenaireRole) {
    message.channel.send("Tu n'as pas la Perm, ceci est disponible pour les Preniums")
}

    mutedUser.removeRole(attenteRole.id);
    message.channel.send(`<@${mutedUser.id}> n'est plus en attente !`)


}

module.exports.help = {
    name: "moi"
}
