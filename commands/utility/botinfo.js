//const Discord = require("discord.js");
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const settings = require('../../settings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Proporciona información sobre el bot."),
    async execute(interaction) {

        let miembros = interaction.client.users.cache.size;
        let servidores = interaction.client.guilds.cache.size;
        let canales = interaction.client.channels.cache.size;
        let bot = interaction.client.user.tag;
        let avatar_bot = interaction.client.user.displayAvatarURL({ dynamic: true });
        let lenguajes = "JavaScript";
        let libreria = "Discord.JS";
        let ping = interaction.client.ws.ping;
    
        let embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: bot, iconURL: avatar_bot })
        .setFooter({ text: bot, iconURL: avatar_bot })
        .setTimestamp(new Date())
        .setThumbnail(avatar_bot)
        .setDescription(`Hola ${interaction.user}, vea la información a continuación:\n\n> 🤖 Nombre: \`${bot}\`.\n> 🤖 Administrador: ${interaction.client.users.cache.get(settings.owner)}.
    \n> ⚙ Miembros: \`${miembros}\`.\n> ⚙ Servidores: \`${servidores}\`.\n> ⚙ Canales: \`${canales}\`.\n> ⚙ Ping: \`${ping}\`.
    \n> 📚 Lenguaje de programación: \`${lenguajes}\`.\n> 📚 Librería: \`${libreria}\`.`);
    
        interaction.reply({ embeds: [embed] });
    },
};
