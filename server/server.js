const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
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
    const ress = await yts(req.params.id);
    res.json(formatres(ress.videos[0]));
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
