const express = require('express');
const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.get('/api/github/*', async (req, res) => {
    const path = req.path.replace('/api/github/', '');
    const githubUrl = `https://api.github.com/${path}`;

    const response = await fetch(githubUrl, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'User-Agent': 'MyApp'
        }
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});