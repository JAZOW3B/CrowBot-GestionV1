const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'antitoken',
    aliases: [],
    run: async (client, message, args) => {
        let prefix = db.get(`${process.env.owner}.prefix`)
        if (prefix === null) prefix = process.env.prefix;
        let color = db.get(`${process.env.owner}.color`)
        if (color === null) color = process.env.color
        if (process.env.owner === message.author.id || db.get(`ownermd.${message.author.id}`) === true) {
            
            if (args[0] === "on") {
                if (db.get(`antitoken_${message.guild.id}`) === true) return message.channel.send(`__L'antitoken__ est déja **activé**`)
                db.set(`antitoken_${message.guild.id}`, true)
                message.channel.send(`L'antitoken est maintenant **activé**`)


            } else if (args[0] === "off") {
                if (db.get(`antitoken_${message.guild.id}`) === null) return message.channel.send(`__L'antitoken__ est déja **désactivé**`)
                db.set(`antitoken_${message.guild.id}`, null)
                message.channel.send(`L'antitoken est maintenant **désactivé**`)


            } else if (args[0] === "lock") {
                if (db.get(`antitoken_${message.guild.id}`) === "lock") return message.channel.send(`**Le serveur est déja verouiller**`)
                db.set(`antitoken_${message.guild.id}`, "lock")
                message.channel.send(`**Le serveur est maintenant verouiller**`)
            }
        } else {
        }
    }
}