const { Events, ChannelType } = require('discord.js');

// Palabras y respuestas correspondientes
const wordResponses = {
    'hola': 'adios',
    'saludos': '¡Hola! ¿Cómo estás?',
    // Agrega más palabras y respuestas aquí
};

module.exports = {
    name: Events.MessageCreate, // Usamos el evento MessageCreate para detectar nuevos mensajes
    async execute(message) {
        console.log('Recibido');
       if (message.author.bot) return; // Ignorar mensajes de otros bots

        const content = message.content.toLowerCase(); // Convertir el contenido del mensaje a minúsculas

        // Verificar si alguna palabra activa una respuesta
        for (const word in wordResponses) {
            if (content.includes(word)) {
                try {
                    await message.reply(wordResponses[word]);
                } catch (error) {
                    console.error(`Error al responder al mensaje: ${error}`);
                }
                break; // Detener el bucle una vez que se encuentra una palabra
                
            }
        }
        console.log('Mensaje recibido');
    }
};
