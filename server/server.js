const { createWriteStream, createReadStream, statSync } = require('fs');
const { Stream } = require('stream')
const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public'), { immutable: true, cacheControl: true, maxAge: 0 }));//for no caching
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
const stream = new Stream();

app.get('/search/:id', async (req, res) => {
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(str);
    const vid = ress.videos[0];
    console.log('found info');
    console.log(formatres(vid));
    res.write(JSON.stringify(formatres(vid)));

    ytdl(vid.url, { quality: 'highestaudio' }).pipe(createWriteStream(`public/vid.mp4`)).on('finish', () => {
        console.log('found video');
        console.log(`finished ${vid.title}`);
        res.end();
    });
    ytdl(vid.url, { quality: 'highestaudio' }).pipe(stream);
});

app.get('/data', (req, res) => {
    res.writeHead(200, {
        'Accept-Ranges': 'bytes',
        'Content-Length': statSync('public/vidd.mp4').size,
        'Content-Type': 'video/mp4',
    });
    const stream = createReadStream('public/vidd.mp4');
    stream.pipe(res);
})
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

    // exec(`ffmpeg -i public/vid.mp4 -vn -ar 44100 -ac 2 -ab 192k -f mp3 public/audio.mp3`, (err, out, stderr) => {
    //     console.log(err, out, stderr);
    // }).on('close', (code, signal) => {
    //     console.log('finished ffmpeg ', code, signal);
    // });