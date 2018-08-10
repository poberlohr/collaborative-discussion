// source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const portNumber = 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('public'));

app.get('/claims', (req, res) => {
    res.json({
        claims: [    
            {
                title: 'Someone Should Create a Collaborative Open-Source Discussion Plattform',
                elaboration: 'Someone should create an online plattform, where people can discuss topics. The participants should not just exchange pros and cons, but rather argue pros and cons in collaboration. The plattform\'s source code should be available to the public for free.',
                pros: [
                    {
                        title: 'Open-Source Allows Instances for Specific Scopes of Application',
                        elaboration: 'If the plattform is open-source, everyone can create a personal plattform suited to ones interests. E.g. one interested in "A Song of Ice and Fire" could create an instance with the sole purpose to discuss conspiracy theories regarding the world of ASOIAF.'
                    },
                    {
                        title: 'Collaboration Improves Quality',
                        elaboration: 'The more participants, the more knowledge, the higher quality.'
                    }
                ],
                cons: [
                    {
                        title: 'Open Online Discussions don\'t Work due to Trolls',
                        elaboration: 'It is entirely impossible to have a high-quality discussion where everyone is allowed to participate. Trolls don\'t participate, they destroy.'
                    }
                ]
            },
            {
                title: 'A Collaborative Open-Source Discussion Plattform Should be Based on Claims',
                elaboration: 'The central entities of a collaborative open-source discussion plattform should be claims. People should start new topics by claiming something and should add claims to argue for or argainst something.'
            }
        ]
    });
});

app.listen(portNumber, () => {
    console.log('Example app listening on port ' + portNumber + '!');
});
