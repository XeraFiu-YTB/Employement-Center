
const Discord = require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {
	//npm install weather-js
	//https://www.npmjs.com/package/weather-js
weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
	if(err) message.channel.send(err);
	//message.channel.send(JSON.stringify(result[0].current, null,2)); cela donne {
 //"temperature": "66",
 //"skycode": "28",
 //"skytext": "Mostly Cloudy",
 //"date": "2019-07-13",
 //"observationtime": "14:30:00",
 //"observationpoint": "Calais, Pas-de-Calais, France",
 //"feelslike": "66",
 // "humidity": "78",
 //"winddisplay": "14 mph North",
 // "day": "Saturday",
 //"shortday": "Sat",
 //"windspeed": "14 mph",
 // "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/28.gif"
//}	
	var location = result[0].location;
	var current = result[0].current;
	var tempera = Math.round(((current.temperature)-32)*5/9)
	var feel = Math.round(((current.feelslike)-32)*5/9)
	const embed = new Discord.RichEmbed()
		.setDescription(`**${current.skytext}**`)
		.setAuthor(`Météo pour ${current.observationpoint}`)
		.setThumbnail(current.imageUrl)
		.setColor("#dc143c")
		.addField('TimeZone', `UTC ${location.timezone}`, true)
		.addField('Type Degrès', 'Celsius °C', true)
		.addField('Temperature', `${tempera} Degrès`, true)
		.addField('Ressentit', `${feel}`, true)
		.addField('Vent', current.winddisplay, true)
		.addField('Humidité', `${current.humidity}%`, true)
message.channel.send(embed)




})


};


module.exports.help = {
    name: "météo"
}


