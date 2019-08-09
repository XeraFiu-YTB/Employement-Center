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

    return message.channel.send('Tu dois faire ..ban @user raison et ajouter une preuve !');
    
}
    const banEmbed = new Discord.RichEmbed()
        .setTitle(`Demande de Ban crée par ${message.author.username}`)
        .setColor('#dc143c')
        .addField("La personne concerné :", banUser)
        .addField('Crime', args.slice(1).join(' '))
        .setFooter('Appuyez sur les réactions ci-dessous')
        
    let banChannel = message.guild.channels.get('609356583167852555')//id du salon pour juste GPP et les Bots
    if (!banChannel) {
                return message.channel.send("Canal 'ban' introuvable. Veillez créer ce canal !");
            }   
    let msg = await banChannel.send(banEmbed);
    await msg.react('✅')
    await msg.react('❌')
    bot.on('messageReactionAdd', (reaction, user) => {
  let noban = 2; // number of thumbsdown reactions you need
  let ban = 2;
  
  if ((reaction.emoji.name == '❌' && reaction.count >= noban)) {
  	return banChannel.send(`L'utilisateur ne sera pas Ban, ${reaction.count} personnes s'opposent !`)
  }

  
  if ((reaction.emoji.name == '✅' && reaction.count >= ban)) {
  	banChannel.send(`L'utilisateur ${banUser} est ban, ${reaction.count} personnes sont en accord !`)
 	return message.guild.member(banUser).ban("Désolé, Nous nous sommes concertés et nous avons choisis de te Ban, Bonne Journée");
}

});

};

module.exports.help = {
    name: "ban"
}