const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const PREFIX = '!';
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const  opusscript = require("opusscript");
const { measureMemory } = require('vm');
const Token = require('./claveDiscord')

let servers = {};


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// Borra las palabras mal sonantes
client.on('message', function (msg){
  
  if(msg.content.toLowerCase() ===  msg.content.includes('pollas') || msg.content.includes('puta') || msg.content.includes('puto') || msg.content.includes('pta')){
      msg.delete()
      msg.reply('eh eh eh, ESO NO!!')
  }
})
// Te da la bienvenida al servidor
client.on("guildMemberAdd", (member) => {
  const canal = member.guild.channels.cache.find(c => c.name === 'general')
  canal.send(`Hola ${member.user}, bienvenido al servidor ${member.guild.name} pasalo bien perra.`);
 
});


// Bot para sacar la id del canal y del usuario

client.on('message', (message)=>{
  if(message.content == "id"){
    message.reply(message.author.id)
    console.log(message.author.id)
    console.log(message.channel)
  }
})

// Bot para borrar mensajes (HASTA 500 MENSAJES)

client.on('message', function(msg){

  if(msg.content == "!clear"){
    msg.channel.bulkDelete(10).then(() =>{
      msg.reply("He borrado todos los mensajes por si acaso")

    })


      }
})


// Bot de musica 

client.on('message',function(message){

  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]){        
    case 'play':
        
        function play(connection,message){
          let server = servers[message.guild.id];

          server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

          server.queue.shift();

          server.dispatcher.on("end", function(){
            if(server.queue[0]){
              play(connection,message);
            }else{
              connection.disconnect();
            }
          });
        }
    


        if(!args[1]){
          message.channel.send("Necesitas proporcionar un link!");
          return;
        }

        if(!message.member.voice.channel){
          message.channel.send("Debes de estar en un canal para reproducirlo!");
          return;

        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        }

        let server = servers[message.guild.id];

        server.queue.push(args[1]);
        
        if(!message.member.voice.connection) message.member.voice.channel.join('766250023108739082').then(function(connection){
          console.log("conectado al canal")
          play(connection, message);
          message.reply("Desarrollalo papi ")
        })

    break;

    

    case 'stop':
      (async function(){
        let server = await  servers[message.guild.id];
        if(message.guild.voice.connection){
          for(let i = server.queue.length -1; i >=0; i--){
            server.queue.splice(i,1);
        }
      

        server.dispatcher.end();
        message.channel.send("Se termino la Cancion")
        console.log('se detiene la cola')
      }
      })();

      if(message.guild.connection) message.guild.voice.connection.disconnect();
    break;



      }
})


  
 
client.login('NzI3NTQ5NDIyMjc1MjY0NTEy.XvtdMw.2_wCcN18jWync3oX58bkZNoqeiU');