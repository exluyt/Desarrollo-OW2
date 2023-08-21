const { Events, ChannelType } = require('discord.js');
const Sentiment = require('sentiment-spanish'); // Importamos la librería Sentiment Spanish


// Configuramos el analizador de sentimientos
const sentiment = new Sentiment();

module.exports = {
    name: Events.ChannelUpdate,
    async execute(oldChannel, newChannel) {
        // Verificamos si es un canal de voz
        if (newChannel.type === ChannelType.GuildVoice) {
            const newName = newChannel.name.toLowerCase();
            let newNameModified = newName;

            // Analizamos el sentimiento del nombre del canal
            const sentimentScore = sentiment.analyze(newName).score;
            console.log(sentimentScore);

            // Si el sentimiento es negativo, reemplazamos el nombre
            if (sentimentScore < 0) {
                newNameModified = 'moderado'; // Cambiar por el nombre deseado
            }

            // Si el nombre se modificó, actualizamos el canal
            if (newNameModified !== newName) {
                try {
                    await newChannel.setName(newNameModified, 'Nombre inapropiado automáticamente modificado');
                } catch (error) {
                    console.error(`Error al cambiar el nombre del canal: ${error}`);
                }
            }
        }
    },
};
