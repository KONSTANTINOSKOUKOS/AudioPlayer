const fs = require('fs');
const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors({ origin: '*' }));

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
    // res.write(JSON.stringify(formatres(ress.videos[0])));
    ytdl(ress.videos[0].url, { quality: 'highestaudio' }).pipe(fs.createWriteStream('vid.mp4')).on('finish', () => {
        console.log('finished');
        // res.download(__dirname + 'vid.mp4', () => console.log('download'));
    });
    res.json(formatres(ress.videos[0]));
    // res.end();
});

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
