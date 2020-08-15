const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
    name: String,
    link: String
})

const SampleModel = mongoose.model("Sample", SampleSchema);

module.exports = SampleModel;