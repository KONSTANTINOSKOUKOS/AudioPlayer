const fs = require('fs');
const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public'), { immutable: true, cacheControl: true, maxAge: 0 }));
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
    //////////////////////DELETE ALPREADY MADE FILES///////////////////////////////
    // fs.unlink('public/vid.mp4', err => {
    //     if (err) console.log(err);
    //     console.log('vid deleted');
    // });
    // fs.unlink('public/audio.mp3', err => {
    //     if (err) console.log(err);
    //     console.log('audio deleted');
    // });
    //////////////////////////////////////MAKE NEW FILES///////////////////////////
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(str);
    const vid = ress.videos[0];
    console.log('found info');

    ytdl(vid.url, { quality: 'highestaudio' }).pipe(fs.createWriteStream(`public/vid.mp4`)).on('finish', () => {
        console.log('found video');
        // exec(`ffmpeg -i public/vid.mp4 -vn -ar 44100 -ac 2 -ab 192k -f mp3 public/audio.mp3`, (err, out, stderr) => {
        //     console.log(err, out, stderr);
        // }).on('close', (code, signal) => {
        //     console.log('finished ffmpeg ', code, signal);
        // });
        console.log(`finished ${vid.title}`);
        res.json(formatres(vid));
    });
});

app.get('/data', (req, res) => {
    // res.writeHead(200, {
    //     'Accept-Ranges': 'bytes',
    //     'Content-Length': fs.statSync('public/vid.mp4').size,
    //     'Content-Type': 'video/mp4',
    // });
    const stream = fs.createReadStream('public/vid.mp4');
    stream
        // .pipe(res)
        .on('data', chunk => {
            res.write(chunk);
        })
        .on('end', () => {
            res.end();
        });
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
