const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SequencerSchema = new Schema({
    sytnhs: [{
        type: Schema.Types.ObjectId,
        ref: "Synth"
    }],

    sequences: [{
        type: Schema.Types.ObjectId,
        ref: "Sequence"
    }]
})

const SequencerModel = mongoose.model("Sequencer", SequencerSchema);

module.exports = SequencerModel;