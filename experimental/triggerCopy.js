const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const prefix = "¡";
        if (!message.content.startsWith(prefix)) return;
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        console.log(command)
        if (command === 'twitter') {
            message.reply('https://twitter.com/overwatchgalaxy');
            message.react('💖');
        //message.channel.send('https://twitter.com/overwatchgalaxy');
        } else if (command === 'facebook') {
            message.reply('https://facebook.com/overwatchgalaxy');
            message.react('🗡️');
        } else if (command === 'tiktok') {
            message.reply('https://tiktok.com/@overwatchgalaxy');
            message.react('🚀');
        } else if (command === 'twitch') {
            message.reply('https://twitch.tv/overwatchgalaxy');
            message.react('737847595187175456');
        } else if (command === 'instagram') {
            message.reply('https://instagram.com/overwatchgalaxyes');
            message.react('973303032785797140');
        } else if (command === 'youtube') {
            message.reply('https://youtube.com/@overwatchgalaxy');
            message.react('973304715750301696');
        } else if (command === 'web') {
            message.reply('https://overwatchgalaxy.com');
            message.react('735558639603155027');
        }
    }
};