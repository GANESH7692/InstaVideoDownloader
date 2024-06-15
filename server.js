const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-video-url', async (req, res) => {
    const shortcode = req.query.shortcode;
    const queryUrl = `https://www.instagram.com/graphql/query?query_hash=2b0673e0dc4580674a88d426fe00ea90&variables={"shortcode":"${shortcode}"}`;

    try {
        const response = await axios.get(queryUrl);
        const videoUrl = response.data.data.shortcode_media.video_url;
        res.json({ video_url: videoUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video URL' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
