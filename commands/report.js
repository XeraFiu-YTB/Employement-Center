const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!reportedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
    }
    let reportedReason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#dc143c")
        .addField("Utilisateur reporté",`${reportedUser} (ID: ${reportedUser.id})`)
        .addField("Utilisateur ayant reporté",`${message.author} (ID: ${message.author.id})`)
        .addField("Canal", message.channel)
        .addField("Raison", reportedReason);

    let reportChannel = message.guild.channels.find(x => x.name === "reports");
    if (!reportChannel) {
        return message.channel.send("Canal 'reports' introuvable. Veillez créer ce canal !");
    }   
    message.delete();
    reportChannel.send(reportEmbed);     

    
}

module.exports.help = {
    name: "report"
}
