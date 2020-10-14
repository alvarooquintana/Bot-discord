const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
import {token} from './claveDiscord'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});


client.on('message', function (msg){
  
  if(msg.content.toLowerCase() ===  msg.content.includes('pollas') || msg.content.includes('puta') || msg.content.includes('puto') || msg.content.includes('pta')){
      msg.delete()
      msg.reply('eh eh eh, ESO NO!!')
  }
})

client.on("guildMemberAdd", (member) => {
  const canal = member.guild.channels.cache.find(c => c.name === 'general')
  canal.send(`Hola ${member.user}, bienvenido al servidor ${member.guild.name} pasalo bien perra.`);
 
});




client.on('message', (message)=>{
  if(message.content == "id"){
    message.reply(message.author.id)
    console.log(message.author.id)
    console.log(message.channel)
  }
})



client.on('message', function(msg){

  if(msg.content == "!clear"){
    msg.channel.bulkDelete(10).then(() =>{
      msg.reply("He borrado todos los mensajes por si acaso")

    })
    



   




      }

})

  
 
client.login('NzI3NTQ5NDIyMjc1MjY0NTEy.XvtdMw.eWHC28emJKj95ySron8WOK1bk1o');