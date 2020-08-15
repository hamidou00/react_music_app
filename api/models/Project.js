const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  synths: [{
    type: Schema.Types.ObjectId,
    ref: "Synth"
  }],

  samples: [{
    type: Schema.Types.ObjectId,
    ref: "Sample"
  }],

  sequencer: {
    type: Schema.Types.ObjectId,
    ref: "Sequencer"
  }
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;