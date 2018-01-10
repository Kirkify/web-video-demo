// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const cookieParser = require('cookie-parser');
const Stream = require('node-rtsp-stream');
const WebSocket = require('ws');
const http = require('http');
let request = require('request');
request = request.defaults({});

const app = express();

let rtspStreams = [];

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(cors({
  origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
  credentials: true,
  exposedHeaders: [
    'auth',
    'connection',
    'date',
    'set-cookie',
    'transfer-encoding',
    'www-authenticate',
    'x-powered-by',
    'x-app-id-challenge'
  ]
}));
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.post('/media-element', (req, res) => {
  const url = req.body.url;



  res.status(200).send(JSON.stringify(response));
});

app.post('/jsmpeg', (req, res) => {
  const url = req.body.url;

  const stream = new Stream({
    name: 'name',
    streamUrl: url, // 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
    wsPort: 9999
  });
  rtspStreams.push(stream);

  const response = {
    port: 9999
  };

  res.status(200).send(JSON.stringify(response));
});

app.post('/message', (req, res) => {
  res.sendStatus(200);
});

app.listen(1234);
