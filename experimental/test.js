// Importamos la librería discord.js con constantes
const Discord = require('discord.js');
const { Intents, PartialTypes } = require('discord-api-types/v9');
const sentiment = require('sentiment-spanish');

const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Esta función analiza el sentimiento de un texto usando el módulo sentiment-spanish
// Devuelve un objeto con la propiedad esInapropiado, que es verdadera si el resultado es negativo
function analizarSentimientos(texto) {
  const resultado = sentiment(texto);
  return { esInapropiado: resultado.score < 0 };
}
// Usamos el evento voiceStateUpdate en lugar de channelUpdate
client.on('voiceStateUpdate', (oldState, newState) => {
  // Obtenemos el canal de voz al que se ha conectado el miembro
  const newChannel = newState.channel;
  // Obtenemos el canal de voz al que estaba conectado antes
  const oldChannel = oldState.channel;
  // Comprobamos si el miembro ha cambiado de canal de voz
  if (newChannel !== oldChannel) {
    // Aquí ponemos el bloque try...catch
    try {
      // Obtenemos la colección de canales de voz del servidor usando .filter()
      const voiceChannels = client.guilds.cache.get(newState.guild.id).channels.cache.filter(channel => channel.type === 'voice');
      // Recorremos la colección de canales de voz usando .forEach()
      voiceChannels.forEach(async voiceChannel => {
        // Obtenemos el nombre del canal de voz
        const nombreCanal = voiceChannel.name;

        // Llamamos a la función analizarSentimientos con el nombre del canal
        const resultado = analizarSentimientos(nombreCanal);

        // Mostramos el resultado en la terminal o consola
        console.log(resultado);

        // Comprobamos si el bot tiene permiso para gestionar el canal usando .permissionsFor()
        if (voiceChannel.permissionsFor(client.user).has('MANAGE_CHANNELS')) {
          // El bot tiene permiso
          if (resultado.esInapropiado) {
            // El nombre del canal es inapropiado, lo cambiamos a 'Inapropiado' usando await o .then()
            await voiceChannel.setName('Inapropiado');
            // Otra opción es usar .then() en lugar de await
            // voiceChannel.setName('Inapropiado').then(() => console.log('Nombre cambiado')).catch(error => console.error(error));
          }
        } else {
          // El bot no tiene permiso
          console.log('El bot no puede cambiar el nombre del canal');
        }
      });
    } catch (error) {
      // Aquí mostramos el error en la consola o enviamos un mensaje al canal
      console.error(error);
    }
  }
});

const config = require('./config.json');
client.login('MTE0MzA3OTM4NTUxNjIyNDUyMw.GeZlaM.LD0cz-u_P7HSqfCDtsyEtEulOCuCWeo6l8ou40');