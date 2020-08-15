const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

//Get All
router.get('/', async (req, res, next) => {
  const allUsers = await UserModel.find();
  res.json(allUsers);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const user = await UserModel.findById(req.params.id)
  res.json(user);
})

//Create One
router.post('/create', async (req, res, next) => {
  const userCreated = await UserModel.create(req.body);
  res.send(`user successfully created : ${userCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const userUpdated = await UserModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`user sccessfully updated : ${userUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const userDeleted = await UserModel.findByIdAndDelete(req.params.id);
  res.send(`user successfully deleted : ${userDeleted}`)
})

module.exports = router;