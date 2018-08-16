const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.post('/', (request, response) => {
    console.log('Going to create claim: ' + request.body);
    // TODO: Validate request
    const claimToSave = request.body;
    claimToSave._id = new mongoose.Types.ObjectId();
    Claim.create(claimToSave, (error, savedClaim) => {
        if (error) {
            response.status(500).send({ error: error });
        } else {
            const location = request.protocol
                + '://'
                + request.get('host')
                + request.originalUrl
                + savedClaim.id;
            response.status(201).append('Location', location).json(savedClaim);
        }
    });
});

module.exports = router;
