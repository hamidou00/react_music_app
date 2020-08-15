const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EffectSchema = new Schema({
    name: String,
    options: Object
})

const EffectModel = mongoose.model("Effect", EffectSchema);

module.exports = EffectModel;