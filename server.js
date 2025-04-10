const express = require('express');
const cors = require('cors');
const allowedOrigins = [
    'https://an-xxx.neocities.org',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

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