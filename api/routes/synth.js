const express = require('express');
const router = express.Router();
const SynthModel = require('../models/Synth');

//Get All
router.get('/', async (req, res, next) => {
  const allSynths = await SynthModel.find();
  res.json(allSynths);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const Synth = await SynthModel.findById(req.params.id)
  res.json(Synth);
})

//Create One
router.post('/create', async (req, res, next) => {
  const SynthCreated = await SynthModel.create(req.body);
  res.send(`Synth successfully created : ${SynthCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const SynthUpdated = await SynthModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`Synth sccessfully updated : ${SynthUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const SynthDeleted = await SynthModel.findByIdAndDelete(req.params.id);
  res.send(`Synth successfully deleted : ${SynthDeleted}`)
})

module.exports = router;