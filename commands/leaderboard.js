const Discord = require("discord.js"),
	arraySort = require('array-sort'),
	table = require('table');

module.exports.run = async (bot, message, args, tools) => {
let invites = await message.guild.fetchInvites();
invites = invites.array()
arraySort(invites, 'uses', { reverse: true});

let possibleInvites = [['User', 'Uses']];
invites.forEach(function(invite) {
possibleInvites.push([invite.inviter.username, invite.uses]);

const embed = new Discord.RichEmbed()
	.setColor(0x7289da)
	.setTitle('Serveur Invites')
	.addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``)
	message.channel.send(embed)


})


	};

module.exports.help = {
    name: "leaderboard"
}