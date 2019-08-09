const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if (!mutedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("Vous n'avez pas les permissions pour faire cela !");
    }
    if(mutedUser.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send('Vous ne pouvez pas mute cette personne !');
    }
console.log("cherche le role pour " + message.member)
    let muteRole = message.guild.roles.find(x => x.name === 'muted');
    console.log("role trouver ou non " + message.member)
    
// Création du rôle

if(!muteRole){
    try {
        muteRole = await message.guild.createRole({
            name: 'muted',
            color: '#000',
            permissions: []

        });
        console.log("role crée pour " + message.member)
        message.guild.channels.forEach(async(channel,id) => {
            await channel.overwritePermissions(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
            console.log("role permission à " + message.member)
        });
    } catch (e) {
        console.log(e.stack);
    }
}
if (muteRole) return;
let muteTime = args[1];
if(!muteTime) return message.channel.send('Spécifier une durée');

await mutedUser.addRole(muteRole.id);
message.channel.send(`<@${mutedUser.id}> est muté pour ${ms(ms(muteTime))}`);

setTimeout(() => {
    mutedUser.removeRole(muteRole.id);
    message.channel.send(`<@${mutedUser.id}> n'est plus réduit au silence .`);
}, ms(muteTime));
};


module.exports.help = {
    name: "mute"
}
