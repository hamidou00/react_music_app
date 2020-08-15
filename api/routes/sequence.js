const express = require('express');
const router = express.Router();
const SequenceModel = require('../models/Sequence');

//Get All
router.get('/', async (req, res, next) => {
  const allSequences = await SequenceModel.find();
  res.json(allSequences);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const Sequence = await SequenceModel.findById(req.params.id)
  res.json(Sequence);
})

//Create One
router.post('/create', async (req, res, next) => {
  const SequenceCreated = await SequenceModel.create(req.body);
  res.send(`Sequence successfully created : ${SequenceCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const SequenceUpdated = await SequenceModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`Sequence sccessfully updated : ${SequenceUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const SequenceDeleted = await SequenceModel.findByIdAndDelete(req.params.id);
  res.send(`Sequence successfully deleted : ${SequenceDeleted}`)
})

module.exports = router;