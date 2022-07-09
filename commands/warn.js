
const Discord = require("discord.js");
const interaction = {}
      const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const { MessageActionRow, MessageButton } = require('discord-buttons');
let random_string = require("randomstring");

module.exports = {
    name: 'warn',
    aliases: [],
    run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
        if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true) {
            let user;
            if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
            if(args[0] && !isNaN(args[0])){
                user = client.users.cache.get(args[0])
         
                if(!message.guild.members.cache.has(args[0])) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
         
            }
            
         
            if(!user) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
            if(user.bot) return 
            if(user.id == message.author.id) return 
          
         
         if(message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return 
         
            let res = args.slice(2).join(" ")
         
            let warnID = await  
            random_string.generate({
              charset: 'numeric',
              length:8
            });
            
         
         
            db.push(`info.${message.guild.id}.${user.id}`,{moderator:message.author.tag , reason:res ? res : "Aucune raison" , date:Date.parse(new Date)/1000,id:warnID})
            db.add(`number.${message.guild.id}.${user.id}`,1)
            if(!res) {
                message.channel.send(`${user} a été **warn**`);
                user.send(`Vous avez été **warn** sur ${message.guild.name}`)
            let chx = db.get(`uu_${message.guild.id}`);
            if (chx === null) {
              return;
            }
            const logschannel = message.guild.channels.cache.get(chx)
            logschannel.send(new MessageEmbed()
            //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
              .setColor(color)
             // .setTitle(`<:protection:847072581382438953> Modération • Type: **\`expulsion\`**`)
            //  .setTimestamp() 
              //.setDescription(`**Expulsion de**: ${user}\n**Auteur**: ${message.author}\n**Pour**: \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
              .setDescription(`${message.author} a **warn** ${user}`)  
            )
            } else {
                message.channel.send(`${user} a été **warn** pour \`${res}\``);
                user.send(`Vous avez été **warn** sur ${message.guild.name} pour \`${res}\``)
                let chx = db.get(`uu_${message.guild.id}`);
                if (chx === null) {
                  return;
                }
                const logschannel = message.guild.channels.cache.get(chx)
                logschannel.send(new MessageEmbed()
                //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                  .setColor(color)
                 // .setTitle(`<:protection:847072581382438953> Modération • Type: **\`expulsion\`**`)
                //  .setTimestamp() 
                  //.setDescription(`**Expulsion de**: ${user}\n**Auteur**: ${message.author}\n**Pour**: \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                  .setDescription(`${message.author} a **warn** ${user} pour \`${res}\``)  
                )
            }
           
        }
    }
}