const { Events, ChannelType } = require('discord.js');

// Lista de palabras inapropiadas
// const inappropriateWords = ['gilipollas', 'otra_palabra', 'puta', 'cabrón', 'etc'];
const inappropriateWords = [
    'gilipollas', 'puta', 'cabrón', 'mierda', 'pendejo', 'idiota', 'coño', 'joder', 'culo', 'chinga',
    'malparido', 'chingar', 'perra', 'maricón', 'zorra', 'huevón', 'pelotudo', 'cagada', 'bastardo', 'pajero',
    'chupapollas', 'capullo', 'mamón', 'funando el server', 'bombardeen el server', 'destruyendo el server', 'hackeando el server',
    'motin en el server', 'staff de mierda', 'admin corruptos', 'staff corruptos',
    'baboso', 'cabrón', 'prostituta', 'estúpido', 'maldito', 'vagina', 'pene',
    'vulgar', 'follar', 'jodido', 'imbécil', 'joputa', 'desgraciado', 'cabronazo', 'culero', 'pendeja', 'cojones',
    'mamada', 'pendejada', 'estupidez', 'maldición', 'porquería', 'mamarse', 'culo', 'coger', 'huevos', 'testículos',
    'vete a la mierda', 'me cago en', 'me cago en la madre', 'me cago en Dios', 'me cago en todo', 'pedazo de mierda',
    'eres una mierda', 'concha', 'zorrón', 'chingón', 'verga', 'mamahuevo', 'pirobo', 'culiado', 'pelotudo', 'baboso',
    'comepollas', 'hijoputa', 'mariconazo', 'estás jodido', 'pendejo', 'chingue su madre', 'puto', 'marica', 'perra',
    'imbécil', 'chúpame', 'vete al diablo', 'me cago en tu madre', 'jódete', 'hijo de puta', 'estás jodido',
    'putear', 'putearse', 'hijueputa', 'jodido', 'me cago en todo', 'hazme el favor', 'cagar', 'mierdita', 'cabrón',
    'mamaverga', 'comeverga', 'pichulotote', 'chupatelo', 'polla', 'pendejada', 'culear', 'estás jodido', 'jodido',
    'putazo', 'cagarse', 'me cago', 'pendejazo', 'hijos de puta', 'pendejazo', 'pendejez', 'hijo de mil putas',
    'conchatumadre', 'vergazo', 'chupada', 'chupapollas', 'malnacido', 'chupa el pito', 'jódanse', 'cagado', 'maldita',
    'maldito', 'jodido', 'me la pelas', 'me chupa un huevo', 'me vale madre', 'comecaca', 'me cago en tu puta madre',
    'me cago en la puta', 'hijos de la gran puta', 'chupame la verga', 'chúpame los huevos', 'cómete un moco', 'comemierda',
    'comecacas', 'eres una mierda', 'me importa un cojón', 'no me importa una mierda', 'me suda la polla', 'me importa un pepino',
    'me suda la pija', 'me importa un rábano', 'me importa un carajo', 'eres un estorbo', 'eres un maldito', 'no vales nada',
    'mierdoso', 'me cago en todo lo que te rodea', 'hazme el favor de chingar a tu madre', 'vete a la mierda y no vuelvas', 'Funando el servidor'
    // Continúa agregando más palabras aquí...
  ];

module.exports = {
    name: Events.ChannelUpdate, // Usamos el evento ChannelUpdate para detectar cambios en los canales
    async execute(oldChannel, newChannel) {
        // Verificamos si es un canal de voz
        if (newChannel.type === ChannelType.GuildVoice) {
            const newName = newChannel.name.toLowerCase(); // Convertimos el nombre a minúsculas para una comparación más fácil
            let newNameModified = newName;

            // Verificamos si el nombre contiene alguna palabra inapropiada
            for (const word of inappropriateWords) {
                if (newName.includes(word)) {
                    // Si encontramos una palabra inapropiada, reemplazamos el nombre
                    newNameModified = newNameModified.replace(word, 'moderado');
                }
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
