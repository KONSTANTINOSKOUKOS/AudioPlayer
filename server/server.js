const express = require('express');
const cors = require('cors');
const yts = require('yt-search');
const app = express();
app.use(cors({ origin: '*' }));

app.get('/:id', async (req, res) => {
    const str = req.params.id.replace('%20', ' ');
    const ress = await yts(req.params.id);
    res.json(ress.videos[0]);
});

app.listen(5000, () => {
    console.log('app online');
})
