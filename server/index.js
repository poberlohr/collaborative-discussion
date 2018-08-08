// source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment

const express = require('express');
const app = express();
const portNumber = 8000;

app.use(express.static('public'));

app.listen(portNumber, () => {
    console.log('Example app listening on port ' + portNumber + '!');
});
