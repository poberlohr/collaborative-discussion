const express = require('express');
const router = express.Router();

const Claim = require('../models/claim.js');

router.get('/', (request, response) => {
    Claim
        .where('isProOf').equals([])
        .where('isConOf').equals([])
        .populate('pros')
        .populate('cons')
        .exec((error, claims) => {
            if (error) {
                response.send(error);
            }

            response.json({ claims: claims });
        });
});

module.exports = router;
