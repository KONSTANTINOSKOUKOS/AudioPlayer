const { createWriteStream, createReadStream, statSync } = require('fs');
const { Stream } = require('stream')
const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const path = require('path');
const http = require('http');
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
        },
        url: res.url
    }
}
const stream = new Stream();

app.get('/search/:id', async (req, res) => {
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(str);
    const vid = ress.videos[0];
    console.log('found info');
    console.log(formatres(vid));
    res.send(formatres(vid));
});

// app.get('/data', (req, res) => {
//     res.writeHead(200, {
//         'Accept-Ranges': 'bytes',
//         'Content-Length': statSync('public/vidd.mp4').size,
//         'Content-Type': 'video/mp4',
//     });
//     const stream = createReadStream('public/vidd.mp4');
//     stream.pipe(res);
// });

app.get('/song/:id', async (req, res) => {
    const ress = await yts({ videoId: req.params.id });
    res.json(formatres(ress));
});

app.get('/playlist/:id', async (req, res) => {
    const ress = await yts({ listId: req.params.id });
    let infos = [];
    ress.videos.forEach(vid => { infos.push(formatres(vid)) });
    res.send(infos);
});

app.get('/convert/:id', async (req, res) => {//LINK OR STRING INTERPOLATION WITH URL?????????
    // ytdl(`https://youtube.com/watch?v=${req.params.id}`, { quality: 'highestaudio' }).pipe(createWriteStream(`public/vid.mp4`)).on('finish', () => {
    //     console.log('found video');
    //     console.log(`finished ${vid.title}`);
    //     res.end();
    // });

    ytdl(`https://youtube.com/watch?v=${req.params.id}`, { quality: 'highestaudio' }).pipe(stream);
    let size = 0;

    stream
        .on('data', chunk => {
            size += chunk.size;
        })
        .on('finish', () => {
            res.writeHead(200, {
                'Accept-Ranges': 'bytes',
                'Content-Length': size,
                'Content-Type': 'video/mp4',
            });

            stream.pipe(res);
        });
});

app.listen(5000, () => {
    console.log('app online');
});