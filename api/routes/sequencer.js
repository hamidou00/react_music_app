const express = require('express');
const router = express.Router();
const SequencerModel = require('../models/Sequencer');

//Get All
router.get('/', async (req, res, next) => {
  const allSequencers = await SequencerModel.find();
  res.json(allSequencers);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const sequencer = await SequencerModel.findById(req.params.id)
  res.json(sequencer);
})

//Create One
router.post('/create', async (req, res, next) => {
  const sequencerCreated = await SequencerModel.create(req.body);
  res.send(`sequencer successfully created : ${sequencerCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const sequencerUpdated = await SequencerModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`sequencer sccessfully updated : ${sequencerUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const sequencerDeleted = await SequencerModel.findByIdAndDelete(req.params.id);
  res.send(`sequencer successfully deleted : ${sequencerDeleted}`)
})

module.exports = router;