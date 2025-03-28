const { Client, NoAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');


const client = new Client({
    authStrategy: new NoAuth()
});

client.on('ready', () => {
    console.log('Tá na mão, patrão! Tudo pronto por aqui!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

const base64Image = fs.readFileSync('./bear.jpg', { encoding: 'base64' });

client.on('message', async (msg) => {
    console.log(`Received message: ${msg.body}`);
    if (msg.body === '!send-media') {
        try {
            const imagem = new MessageMedia('image/jpeg', base64Image, 'bear.jpg');
            await client.sendMessage(msg.from, imagem);
            console.log('Image sent successfully!');
        } catch (error) {
            console.error('Failed to send image:', error);
        }
    }
});

client.on('message_create', message => {
	if (message.body.toLocaleLowerCase() === 'biscoito') {
		client.sendMessage(message.from, 'Eu te amo, Manu');
	}
	else if (message.body.toLocaleLowerCase() === 'jujuba') {
		client.sendMessage(message.from, 'Você é a minha princesa, Manu');
	}
	else if (message.body.toLocaleLowerCase() === 'coração') {
		client.sendMessage(message.from, 'Te amo para sempre meu amor!');
	}
    
});

client.initialize();
