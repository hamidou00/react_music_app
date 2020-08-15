const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/Project');

//Get All
router.get('/', async (req, res, next) => {
  const allProjects = await ProjectModel.find();
  res.json(allProjects);
});

//Get One by Id
router.get('/getOne/:id', async (req, res, next) => {
  const project = await ProjectModel.findById(req.params.id)
  res.json(project);
})

//Create One
router.post('/create', async (req, res, next) => {
  const projectCreated = await ProjectModel.create(req.body);
  res.send(`project successfully created : ${projectCreated}`);
})

//Update One
router.patch('/update/:id', async (req, res, next) => {
  const projectUpdated = await ProjectModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(`project sccessfully updated : ${projectUpdated}`);
})

//Delete One
router.delete('/delete/:id', async (req, res, next) => {
  const projectDeleted = await ProjectModel.findByIdAndDelete(req.params.id);
  res.send(`project successfully deleted : ${projectDeleted}`)
})

module.exports = router;