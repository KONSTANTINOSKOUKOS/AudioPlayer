const fs = require('fs');
const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const { spawn, exec } = require('child_process');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

const formatres = (res) => {
    return {
        title: res.title,
        author: res.author.name,
        image: res.image,
        duration: {
            seconds: res.duration.seconds,
            timestamp: res.duration.timestamp
        }
    }
}

app.get('/search/:id', async (req, res) => {
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(str);
    const vid = ress.videos[0];
    console.log('found info');
    res.write(JSON.stringify(formatres(vid)));

    ytdl(vid.url, { quality: 'highestaudio' }).pipe(fs.createWriteStream('public/vid.mp4')).on('finish', () => {
        console.log('found video');
        // spawn('ffmpeg', ['-i', 'public/vid.mp4', '-vn', '-ar', '44100', '-ac', '2', '-ab', '192', 'f', 'mp3', 'public/audio.mp3']);
        // exec('ffmpeg -i public/vid.mp4 -vn -ar 44100 -ac 2 -ab 192 -f mp3 public/audio.mp3',(err,out,stderr))
        console.log(`finished ${vid.name}`);
        // ffmpeg -i public/vid.mp4 -vn -ar 44100 -ac 2 -ab 192 -f mp3 public\audio.mp3
    });
    res.end();
});
// new ffmpeg('public/vid.mp4').then(vid => {
//     vid.fnExtractSoundToMP3('public/audio.mp3').then(() => console.log('converted'));
// });

app.get('/song/:id', async (req, res) => {
    const ress = await yts({ videoId: req.params.id });
    res.json(formatres(ress));
});

app.get('/playlist/:id', async (req, res) => {
    const ress = await yts({ listId: req.params.id });
    const links = ress.videos.map(val => {
        return val.videoId;
    });

    const first = yts({ videoId: links[0] }).then(val => {
        return formatres(val);
    });
    res.json({
        links,
        first
    });
});

app.listen(5000, () => {
    console.log('app online');
});
