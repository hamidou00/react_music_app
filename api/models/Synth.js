const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SynthSchema = new Schema({
    name: String,
    effects: [{
        type: Schema.Types.ObjectId,
        ref: "Effect"
    }],

    sequences: [{
        type: Schema.Types.ObjectId,
        ref: "Sequence"
    }]
})

const SynthModel = mongoose.model("Synth", SynthSchema);

module.exports = SynthModel;