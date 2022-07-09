const backup = require("discord-backup")
        const Discord = require('discord.js');
        const db = require("quick.db") 
        module.exports = {
        name: 'delete',
        aliases: [],
        run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
        if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
            if(args[0] === "emoji") {
        
         if(args[1] === "backup") {
             let code = args[2]
             if(!code ) return
            let pog = db.get(`backups_${process.env.owner}`);
            if (pog) {
                let data = pog.find(x => x.code === code)
                if (!data) return
               
        db.set(`backups_${process.env.owner}`,  db.get(`backups_${process.env.owner}`).filter(s => s.code !==code))
        message.channel.send(`Backup supprimée`)
            } else {
           
            }
            
                
         } 
            } else  if(args[0] === "serveur") {
        
                if(args[1] === "backup") {
                    let code = args[2]
                    if(!code ) return
                   let pog = db.get(`bilgiee_${process.env.owner}`);
                   if (pog) {
                       let data = pog.find(x => x.code === code)
                       if (!data) return
                       message.channel.send(`Backup supprimée`)
               backup.fetch(data.dcode).then((backupInfos) => {
                backup.remove(data.dcode)
                db.set(`bilgiee_${process.env.owner}`,  db.get(`bilgiee_${process.env.owner}`).filter(s => s.code !==code))
    }).catch((err) => {})
                   } else {
                  
                   }
                   
                       
                } 
                   }
        } else {
        
        }
        
        }
        }
        
  