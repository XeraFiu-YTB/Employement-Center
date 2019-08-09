const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//if (!banUser) {
//	message.channel.bulkDelete(1)
//        return message.channel.send("L'utilisateur n'existe pas !");
//    }
message.channel.bulkDelete(1)
if(!message.member.hasPermission("MANAGE_MESSAGES")){
	message.channel.send("Vous n'avez pas les permissions pour faire cela !");
    message.channel.bulkDelete(1)
    }
    if (!args[1]) {
    message.channel.send('Tu dois faire !ban @user raison et ajouter une preuve !');
    message.channel.bulkDelete(1)
}
    const banEmbed = new Discord.RichEmbed()
        .setTitle(`Demande de Ban crée par ${message.author.username}`)
        .setColor('#dc143c')
        .addField("La personne concerné :", banUser)
        .addField('Crime', args.slice(2).join(' '))
        .setFooter('Appuyez sur les réactions ci-dessous')
        
    let banChannel = message.guild.channels.find(x => x.name === "ban");
    if (!banChannel) {
                return message.channel.send("Canal 'ban' introuvable. Veillez créer ce canal !");
            }   
    let msg = await banChannel.send(banEmbed);
    await msg.react('✅')
    await msg.react('❌')
    bot.on('messageReactionAdd', (reaction, user) => {
  let noban = 2; // number of thumbsdown reactions you need
  let ban = 5;
  if (reaction.emoji.name == '❌' && reaction.count >= noban) {
  	banChannel.send(`L'utilisateur ne sera pas Ban, ${reaction.count} personnes s'opposent !`)
  }
  if (reaction.emoji.name == '✅' && reaction.count >= noban) {
  	banChannel.send(`L'utilisateur ${banUser} est ban, ${reaction.count} personnes sont en accord !`)
 	message.guild.member(banUser).ban("Désolé, Nous nous sommes concertés et nous avons choisis de te Ban, Bonne Journée");
}
});

};

module.exports.help = {
    name: "ban"
}