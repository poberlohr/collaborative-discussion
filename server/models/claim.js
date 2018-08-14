const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    elaboration: String,
    isProOf: [{ type: Schema.Types.ObjectId, ref: 'Claim' }],
    isConOf: [{ type: Schema.Types.ObjectId, ref: 'Claim' }],
    pros: [{ type: Schema.Types.ObjectId, ref: 'Claim' }],
    cons: [{ type: Schema.Types.ObjectId, ref: 'Claim' }]
});

module.exports = mongoose.model('Claim', ClaimSchema);
