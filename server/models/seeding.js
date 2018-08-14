const mongoose = require('mongoose');
const Claim = require('./claim');

function seedClaims() {
    Claim.find((findError, claims) => {
        if (findError) {
            console.log('Error while seeding claims: ' + findError);
            return;
        }

        if (claims.length) {
            console.log(`${claims.length} claims exist, skip seeding.`);
            return;
        }

        const claim1 = new Claim({
            _id: new mongoose.Types.ObjectId(),
            title: 'Someone Should Create a Collaborative Open-Source Discussion Plattform',
            elaboration: 'Someone should create an online plattform, where people can discuss topics. The participants should not just exchange pros and cons, but rather argue pros and cons in collaboration. The plattform\'s source code should be available to the public for free.',
            pros: [],
            cons: []
        });

        const claim1Pro1 = new Claim({
            _id: new mongoose.Types.ObjectId(),
            title: 'Open-Source Allows Instances for Specific Scopes of Application',
            elaboration: 'If the plattform is open-source, everyone can create a personal plattform suited to ones interests. E.g. one interested in "A Song of Ice and Fire" could create an instance with the sole purpose to discuss conspiracy theories regarding the world of ASOIAF.',
            isProOf: [claim1._id],
            pros: [],
            cons: []
        });

        const claim1Pro2 = new Claim({
            _id: new mongoose.Types.ObjectId(),
            title: 'Collaboration Improves Quality',
            elaboration: 'The more participants, the more knowledge, the higher quality.',
            isProOf: [claim1._id],
            pros: [],
            cons: []
        });

        const claim1Con1 = new Claim({
            _id: new mongoose.Types.ObjectId(),
            title: 'Open Online Discussions don\'t Work due to Trolls',
            elaboration: 'It is entirely impossible to have a high-quality discussion where everyone is allowed to participate. Trolls don\'t participate, they destroy.',
            isConOf: [claim1._id],
            pros: [],
            cons: []
        });

        claim1.pros = [claim1Pro1._id, claim1Pro2._id];
        claim1.cons = [claim1Con1._id];

        const claim2 = new Claim({
            _id: new mongoose.Types.ObjectId(),
            title: 'A Collaborative Open-Source Discussion Plattform Should be Based on Claims',
            elaboration: 'The central entities of a collaborative open-source discussion plattform should be claims. People should start new topics by claiming something and should add claims to argue for or argainst something.',
            pros: [],
            cons: []
        });

        const saveCallback = (saveError) => {
            if (saveError) {
                console.log('Error while seeding claims: ' + saveError);
            }
        };

        claim1.save(saveCallback);
        claim1Pro1.save(saveCallback);
        claim1Pro2.save(saveCallback);
        claim1Con1.save(saveCallback);
        claim2.save(saveCallback);
    });
}

module.exports.seed = () => {
    seedClaims();
};
