const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.delete(1)
let msgChannel = message.guild.channels.get(args[0])
let msgContent = args.slice(1).join(' ')
msgChannel.send(msgContent)


    
}

module.exports.help = {
    name: "say"
}
