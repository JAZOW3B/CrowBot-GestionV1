const Discord= require('discord.js')
const db = require('quick.db')
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: 'clear',
    aliases: [],
    run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
//  if(args[0] === "prevname") {
//   if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true || db.get(`public_${message.guild.id}`) === true) {
//     let member =  message.author

//     db.delete(`usernames_${member.id}`)
//     db.delete(`nombreuser_${member.id}`, db.get(`nombreuser_${member.id}`) )
//     message.channel.send(`Tout vos anciens pseudos ont été supprimé`)
//   }
//  } else  
  if(args[0] === "wl") {
      if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
        message.channel.send(`${db.get(`${message.guild.id}.wlcount`) === undefined||null ? 0:db.get(`${message.guild.id}.wlcount`)} ${db.get(`${message.guild.id}.wlcount`) > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} de la whitelist`)
            db.delete(`${message.guild.id}.wlcount`)
            db.delete(`${message.guild.id}.wl`)
            let tt = await db.all().filter(data => data.ID.startsWith(`${message.guild.id}`));
            let ttt = 0;
            for(let i = 0; i < tt.length; i++) {
              db.delete(tt[i].ID);
              ttt++;
            }   
        } else {
            
        }
    }
    else  if(args[0] === "bl") {
      if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
        message.channel.send(`${db.get(`${process.env.owner}.blacklistcount`) === undefined||null ? 0:db.get(`${process.env.owner}.blacklistcount`)} ${db.get(`${process.env.owner}.blacklistcount`) > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} de la blacklist`)
            db.delete(`${process.env.owner}.blacklistcount`)
            db.delete(`${process.env.owner}.blacklist`)
            let tt = await db.all().filter(data => data.ID.startsWith(`blacklistmd`));
            let ttt = 0;
            for(let i = 0; i < tt.length; i++) {
              db.delete(tt[i].ID);
              ttt++;
            }   
        } else {
            
        }

    }
    if(args[0] === "sanctions") {
      let user;
      if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
      if(args[0] && !isNaN(args[0])){
          user = client.users.cache.get(args[0])
   
          if(!message.guild.members.cache.has(args[0])) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
      }
    }
else    if(args[0] === "owners") {
      if(process.env.owner ===message.author.id ) {
        message.channel.send(`${db.get(`${process.env.owner}.ownercount`) === undefined||null ? 0:db.get(`${process.env.owner}.ownercount`)} ${db.get(`${process.env.owner}.ownercount`) > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} des owners`)
            db.delete(`${process.env.owner}.ownercount`)
            db.delete(`${process.env.owner}.owner`)
            let tt = await db.all().filter(data => data.ID.startsWith(`ownermd`));
            let ttt = 0;
            for(let i = 0; i < tt.length; i++) {
              db.delete(tt[i].ID);
              ttt++;
            }   
            
              
 
        } else {

        }

    } 
    else
    if(message.mentions.members.first()) {
      if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true) {

      message.delete()
      message.channel.messages.fetch({limit: 100})
          .then ((messages) => {
          var filterUser = message.mentions.members.first().id;
          var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, 100);      
          message.channel.bulkDelete(filtered, true)   
        //  message.channel.send(`<a:806652956258467840:847072698248069171> | J'ai effacé \`${_message.size}\` messages de **${message.mentions.members.first().tag}**`).then((sent) => {
         //   setTimeout(function () {
           //   sent.delete();
            //}, 2500);
          //});    
      }).catch(console.error);     } 
    } else
          if (!isNaN(message.content.split(' ')[1])) {
            if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true) {

              let amount = 0;
              if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
                amount = 1;
              } else {
                message.delete()
                amount = message.content.split(' ')[1];
                if (amount > 100) {
                  amount = 100;
                }
              }
              await message.channel.bulkDelete(amount, true).then((_message) => {
               // message.channel.send(`<a:806652956258467840:847072698248069171> | J'ai effacé \`${_message.size}\` messages `).then((sent) => {
                 //  setTimeout(function () {
                 //    sent.delete();
                 //  }, 2500);
               //  });
              });}
            } else {
              if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true) {

              message.delete()
              await message.channel.bulkDelete(100, true).then((_message) => {
              
              //  message.channel.send(`<a:806652956258467840:847072698248069171> |  J'ai effacé \`${_message.size}\` messages `).then((sent) => {
                //  setTimeout(function () {
                  //  sent.delete();
                  //}, 2500);
                //});
              });}
            }


    }
}