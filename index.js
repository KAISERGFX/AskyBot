import FfmpegPath from '@ffmpeg-installer/ffmpeg';
import WAWebJS from "whatsapp-web.js";
import qrcode from 'qrcode-terminal'
import Spinnies from "spinnies";
import chalk from 'chalk';
import {} from "./stickers.js";

const spinnies = new Spinnies();
const ffmpegPath = FfmpegPath.path;
const { Client, LocalAuth } = WAWebJS;

const client = new Client({
  authStrategy: new LocalAuth(),
  ffmpegPath,
  puppeteer: {
    args: ['--no-sandbox']
  }
});

console.log(chalk.green('\n🤖 Simple WhatsApp Bot Sticker by Aromakelapa\n'));

// Init Bot
client.initialize();

spinnies.add('Connecting', { text: 'Opening Whatsapp Web' })

client.on('loading_screen', (percent, message) => {
  // console.log('', percent, message);
  spinnies.update('Connecting', { text: `Connecting. ${message} ${percent}%`});
});

// On Login
client.on('qr', (qr) => {
  spinnies.add('generateQr', {text: 'Generating QR Code'});
  console.log(chalk.yellow('[!] Scan QR Code Bellow'));
  qrcode.generate(qr, {small: true});
  spinnies.succeed('generateQr', {text: 'QR Code Generated'});
  spinnies.update('Connecting', { text: 'Waiting to scan' })
});

// Authenticated
client.on('authenticated', () => {
  // spinnies.update('Connecting', {text: ''});
  console.log(chalk.green(`✓ Authenticated!                          `))
});

// Auth Failure
client.on('auth_failure', (msg) => {
  console.error('Authentication Failure!', msg);
});

// Bot Ready
client.on('ready', () => {
  spinnies.succeed('Connecting', { text: 'Connected!', successColor: 'greenBright' });
  aboutClient(client);
  console.log('Incoming Messages : \n');
});

// Disconnected
client.on('disconnected', (reason) => {
  console.log('Client was logged out, Reason : ', reason);
});

function aboutClient(client){
  console.log(chalk.cyan(
    '\nAbout Client :' +
    '\n  - Username : ' + client.info.pushname +
    '\n  - Phone    : ' + client.info.wid.user +
    '\n  - Platform : ' + client.info.platform + '\n'
  ));
};

