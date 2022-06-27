const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const app = express();

app.use(cors({ origin: '*' }));

app.get('/search/:id', async (req, res) => {
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(req.params.id);
    res.json(ress.videos[0]);
});

app.get('/song/:id', async (req, res) => {
    const ress = await yts({ videoId: req.params.id });
    res.json({
        title: ress.title,
        author: ress.author,
        image: ress.image,
        duration: {
            seconds: ress.duration.seconds,
            timestamp: ress.duration.timestamp
        }
    });
});

app.get('/playlist/:id', async (req, res) => {
    const ress = await yts({ listId: req.params.id });
    const links = ress.videos.map(val => {
        return val.videoId;
    });

    const first = yts({ videoId: links[0] }).then(val => {
        return {
            title: val.title,
            author: val.author,
            image: val.image,
            duration: {
                seconds: val.duration.seconds,
                timestamp: val.duration.timestamp
            }
        };
    });
    res.json({
        links,
        first
    });
});

app.listen(5000, () => {
    console.log('app online');
})
