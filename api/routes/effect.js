const express = require('express');
const router = express.Router();
const EffectModel = require('../models/Effect');

//Get All
router.get('/', async (req, res, next) => {
  const allEffects = await EffectModel.find();
  res.json(allEffects);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const Effect = await EffectModel.findById(req.params.id)
  res.json(Effect);
})

//Create One
router.post('/create', async (req, res, next) => {
  const EffectCreated = await EffectModel.create(req.body);
  res.send(`Effect successfully created : ${EffectCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const EffectUpdated = await EffectModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`Effect sccessfully updated : ${EffectUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const EffectDeleted = await EffectModel.findByIdAndDelete(req.params.id);
  res.send(`Effect successfully deleted : ${EffectDeleted}`)
})

module.exports = router;