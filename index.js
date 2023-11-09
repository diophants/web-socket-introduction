const https = require('https');
const fs = require('fs');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const options = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.crt'),
};

const server = https.createServer(options, app);
const wss = new WebSocket.Server({ server });

server.listen(5000, () => {
  console.log('Server is running');
});

wss.on('connection', (ws) => {
  console.log('New connection');
  ws.on('message', (data) => {
    data = data.toString();
    console.log(data);
  });
  ws.send('thanks for connection!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
