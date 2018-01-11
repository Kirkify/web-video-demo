// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const cookieParser = require('cookie-parser');
const Stream = require('node-rtsp-stream');
const ffmpeg = require('fluent-ffmpeg');
const crypto = require('crypto');
const fs = require('fs');
const WebSocket = require('ws');
var path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.post('/hls', (req, res) => {
  const url = req.body.url;
  // make sure you set the correct path to your video file storage
  // var pathToMovie = './storage/' + req.params.filename;
  const folderName = '/hls/' + crypto.randomBytes(15).toString('hex');
  const streamName = '/stream.m3u8';

  fs.mkdirSync('./public' + folderName);

  var proc = ffmpeg(url).outputOptions([
        '-profile:v baseline',
        '-s 640x360',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
      ])
    .on('start', commandLine => {
      console.log(commandLine);
    })
    .save('./public' + folderName + streamName);

  const data = {
    url: serverAddress +  folderName + streamName
  };

  res.status(200).send(JSON.stringify(data));

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

var serverAddress = 'http://localhost:1234';
