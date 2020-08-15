const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SequenceSchema = new Schema({
    synths: [{
        type: Schema.Types.ObjectId,
        ref: "Synth"
    }],

    sequences: [{
        type: Schema.Types.ObjectId,
        ref: "Sequence"
    }]
})

const SequenceModel = mongoose.model("Sequence", SequenceSchema);

module.exports = SequenceModel;