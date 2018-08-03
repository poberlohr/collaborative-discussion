// source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    // console.log('Example app listening on port 8000!');
});
