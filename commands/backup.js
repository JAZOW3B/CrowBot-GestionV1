
        const Discord = require('discord.js');
        const db = require("quick.db") 
        const backup = require("discord-backup")
        module.exports = {
        name: 'backup',
        aliases: [],
        run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
        if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
            if(args[0] === "list") {
        
         if(args[1] === "emoji") {
     
    try {
        let bkp = db.get(`backups_${process.env.owner}`)
        if(bkp === null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucune backup d'émoji enregistrée"))
        let tdata = await message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle(`Liste des backups d'émoji`))

        let p0 = 0;
        let p1 = 30;
        let page = 1;

        let embed = new Discord.MessageEmbed()


        embed.setTitle(`Liste des backups d'émoji`)
        .setColor(color)
        .setDescription(bkp
          .map(r => r)
          .map((r, i) => `${r.code}`)
            .slice(0, 30)
            )
          
        let reac1
        let reac3

        if ( bkp.length> 30) {
         
            reac1 = await tdata.react("◀");
        
            reac3 = await tdata.react("▶");
        
        }

        tdata.edit(" ", embed);

        const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

        data_res.on("collect", async (reaction) => {

            if (reaction.emoji.name === "◀") {

                p0 = p0 - 30;
                p1 = p1 - 30;
                page = page - 1

                if (p0 < 0) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed    .setDescription(bkp
                    .map(r => r)
                    .map((r, i) => `${r.code}`)
                      .slice(0, 30)
                      )
                tdata.edit(embed);

            }

            if (reaction.emoji.name === "▶") {

                p0 = p0 + 30;
                p1 = p1 + 30;

                page++;

                if (p1 >  bkp.length+ 30) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed     .setDescription(bkp
                    .map(r => r)
                    .map((r, i) => `${r.code}`)
                      .slice(0, 30)
                      )
                tdata.edit(embed);

            }

        

            await reaction.users.remove(message.author.id);

        })

    } catch (error) {
        console.log(error)
    }
        
        } else if(args[1] === "serveur") {

            let p0 = 0;
            let p1 = 30;
            let page = 1;
            let ie = 0;
         
            let backup = await db.get(`bilgiee_${process.env.owner}`)
            if(backup === null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucune backup de serveur enregistrée"))
            let tdata = await message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle(`Liste des backups de serveur`))

            
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Liste des backups de serveur`)
            .setDescription(backup
     .map(r => r)
                .map((s, i) => `${s.code}`)    
                            .slice(p0, p1)
                )
            .setColor(color)

   
            if (backup.length > 30) {
             
            await tdata.react("◀");
           
        await tdata.react("▶");
                await sleep(2300);
            }
            
            tdata.edit(" ", embed);
            
            const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);
            
            data_res.on("collect", async (reaction) => {
            
                if (reaction.emoji.name === "◀") {
            
                    p0 = p0 - 30;
                    p1 = p1 - 30;
                    page = page - 1
            
                    if (p0 < 0) {
                        return
                    }
                    if (p0 === undefined || p1 === undefined) {
                        return
                    }
            
            
                    embed
                    .setDescription(backup
 .map(r => r)
 .map((s, i) => `${s.code}`)    
             .slice(p0, p1)                        )

                   
                    tdata.edit(embed);
            
                }
            
                if (reaction.emoji.name === "▶") {
            
                    p0 = p0 + 30;
                    p1 = p1 + 30;
            
                    page++;
            
                    if (p1 > backup.length + 30) {
                        return
                    }
                    if (p0 === undefined || p1 === undefined) {
                        return
                    }
            
                    embed
                    .setDescription(backup
 .map(r => r)
 .map((s, i) => `${s.code}`)    
             .slice(p0, p1)                        )

                   
                    tdata.edit(embed);
            
                }
            
            
            
                await reaction.users.remove(message.author.id);
            
            })
        }
        
    
    
    }}}}
        
  