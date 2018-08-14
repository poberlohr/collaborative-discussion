// source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment

const express = require('express');
const app = express();
const portNumber = 8000;

const bodyParser = require('body-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/collaborative-discussion');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongoose connection opened.');
});

require('./models/seeding').seed();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('public'));

app.use('/claims', require('./routes/claimRouter'));

app.listen(portNumber, () => {
    console.log('Example app listening on port ' + portNumber + '!');
});
