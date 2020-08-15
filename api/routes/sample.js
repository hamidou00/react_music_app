const express = require('express');
const router = express.Router();
const SampleModel = require('../models/Sample');

//Get All
router.get('/', async (req, res, next) => {
  const allSamples = await SampleModel.find();
  res.json(allSamples);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const Sample = await SampleModel.findById(req.params.id)
  res.json(Sample);
})

//Create One
router.post('/create', async (req, res, next) => {
  const SampleCreated = await SampleModel.create(req.body);
  res.send(`Sample successfully created : ${SampleCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const SampleUpdated = await SampleModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`Sample sccessfully updated : ${SampleUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const SampleDeleted = await SampleModel.findByIdAndDelete(req.params.id);
  res.send(`Sample successfully deleted : ${SampleDeleted}`)
})

module.exports = router;