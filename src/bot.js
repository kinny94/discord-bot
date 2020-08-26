require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '$';
const JOKES = [
    `Dhruv Patel`,
    `3/4 of my flashes are team flashes`,
    `I can awp`,
    `I come only on weekends to prove my worth... which is nothing`,
    `I always workout after having a large pizza`,
    `One day I'll make you all faceit level 1, that's the dream;`,
];

const TRUTH = [
    `I am a noob`,
    `I don't know how to AWP`,
    `I can't remember any smokes`,
    `I can barely aim`,
    `I have 0 game sense`,
    `I always get carried`
];

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
    const channel = client.channels.cache.get('395302321489313794');
    channel.send(`I am a bot, just like survivor, developed by kinny
    Available Commands: $kick id, $shutup id, $truth, $jokes`);
});

client.on('message', (message) => {
    console.log(`${message.author.tag}: ${message.content}`);
    if (message.author.bot) { return; };
    if (message.content.startsWith(PREFIX)) {
        const [commandName, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        if (commandName === 'kick') {
            if (args.length === 0) {
                return message.reply('Please provide a command!!');
            }
            const member = message.guild.members.cache.get(args[0]);
            return kick(member, message);
        } else if (commandName === 'shutup') {  
            if (args.length === 0) {
                return message.reply('Please provide a command!!');
            }       
            const member = message.guild.members.cache.get(args[0]);
            return mute(member, message);
        } else if (commandName === 'jokes') {
            const joke = JOKES[Math.floor(Math.random() * JOKES.length)];
            message.channel.send(joke);
        } else if (commandName === 'truth') {
            const truth = TRUTH[Math.floor(Math.random() * TRUTH.length)];
            message.channel.send(truth);
        } else {
            message.channel.send('Command not found, just like my aim');
        }
    } 
});

function kick(member, message) {
    if (member) {
        member.kick().then((member) => {
            if (member.id === process.env.SURVIVOR_ID) {
                return message.channel.send(`The noobest member was clicked from the server!`);
            } else {
                return message.channel.send(`I cannot kick pro players... only the noobest noob in the whole world!`);
            }
        }).catch((err) => {
           return message.channel.send(`Chutiya is not in the server ATM!!`); 
        });
    } else {
        return message.channel.send(`Member was not found!!`);
    } 
}

function mute(member, message) {
    if (member) {
        if (member.id === process.env.SURVIVOR_ID && member.presence.status === 'online') {
            member.voice.setMute(true).then(() => {
                message.channel.send(`Bot shall not speak!!`);
            }).catch(() => {
                return message.channel.send(`The biggest noob in the world is not voice connected!`);
            });
        } else {
            return message.channel.send(`Chutiya is not in the server!!`);
        }
    } else {
        return message.channel.send(`Invallid command!`);
    };
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

