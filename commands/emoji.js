const Discord = require('discord.js');
const db = require("quick.db") 
module.exports = {
name: 'emoji',
aliases: [],
run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
 if(args[0] === "backup") {
	let code = args[1]
    if(!code) return
    let bruh = `backups_${process.env.owner}`;
    message.channel.send(`Backup en cours...`)
        
		let emoji = message.guild.emojis.cache;
	
	
		let arr = new Array();
		emoji.forEach(e => arr.push(e.toString()));
		db.push(bruh, {
			code: code,
			server: message.guild.name,
			emojis: arr,
            size: emoji.size
		});
		
		return message.channel.send(`${emoji.size} ${emoji.size?"émojis ont été sauvegardés":"émoji à été sauvegardé"}`);
 } else {}

} else {

}

}
}

