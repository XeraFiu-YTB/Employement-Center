const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    message.channel.bulkDelete(1)
	  //supprime le message si il y a des informations Privées
        var server = message.guild 
        const reason = message.content.split(" ").slice(1).join(" "); //la question

        if (!message.guild.roles.exists("name", "📃 Helper")) return message.channel.send(`Ce Serveur n'a pas de Role \`📃 Helper\`, il faut le créer sinon le ticket ne peut etre ouvert.`);
        //Role @📃 Helper qui pourra lire le problème
        if (message.guild.channels.exists("name", "ticket-" + message.author.username.toLowerCase())) return message.channel.send(`Tu as déjà un ticket ouvert`);//Annule si l'utilisateur adéjà un ticket
        if (!args[0]) return message.channel.send(`Vous devez spécifier un Problème, !help problème`);//Annule si il n'y a pas de problème
        message.guild.createChannel(`ticket-${message.author.username.toLowerCase()}`, "text").then(c => {
            let category = server.channels.find(c => c.name == "Help" && c.type == "category")
            c.setParent(category.id)
            let role = message.guild.roles.find("name", "📃 Helper");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {//@📃 Helper peut lire les questions
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {//Personne ne peut lire la question(sauf autheur & Helper)
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {//la personne peut voir le salon et écrire
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.member.sendMessage(`${message.author.username}, ton ticket vient d'être crée, <#${c.id}>.`);//DM pour savoir quel salon rejoindre
            const embed = new Discord.RichEmbed()//création de l'embed

                .setColor('#0e0e6d')
                .addField(`Hey ${message.author.username}, quand tu as fini, clique sur la réaction !`, `✅`)
                .addField(`Ton problème est le suivant :`, ` ${reason}`)
                .setTimestamp();
            c.send({
                embed: embed
            }).then (function (message){//ajout d'une réaction permettant de sup le channel au lieu de faire !close
                message.react('✅')
  bot.on('messageReactionAdd', (reaction, user) => {
console.log("dans bot.on")
  if (reaction.emoji.name === "✅" && user.id !== bot.user.id) {
    c.delete()
    console.log("Delete salon")
  
};
		

		
            
             });
            });
		

            
        }).catch(console.error); // Send errors to console

    };


	module.exports.help = {
    name: "help"
}