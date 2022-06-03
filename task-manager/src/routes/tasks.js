const Tasks = require('../models/tasks')
const express = require('express')

const router = express.Router();

router.post('/tasks', async (req, res) => {
  console.log(req.body)
  const task = new Tasks(req.body)

  try{
    await task.save()
    res.status(201).send(task)
  }catch(error){
    res.status(400).send(error)
  }
})

router.get('/tasks', async (req, res) => {

  try{
    const tasks = await Tasks.find({})
    res.status(200).send(tasks)
  }catch(error){
    res.status(404).res.send(error)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try{
    const taskFound = await Tasks.findById(_id);
    if(!taskFound)
      return res.status(404).send({
        'error': 'no element found'
      });
    
    res.send(taskFound);
  }catch(error){
    res.status(404).send({
      'error': 'no element found by the given id'
    })
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  const update = Object.keys(req.body);
  const validUpdates = ['description', 'completed'];
  const isValidUpdate = update.every(update => validUpdates.includes(update))

  if(!isValidUpdate)
    return res.status(404).send({error: 'Update Unvalid'})

  try{

    const toUpdate = await Tasks.findById(_id);
    update.forEach(item => toUpdate[item] = req.body[item])
    await toUpdate.save()

    //const update = await Tasks.findByIdAndUpdate(_id, req.body,  { new: true, runValidators: true })
    if(!toUpdate){
      res.status(404).send({error: 'No item found by the given id'})
    }

    res.status(200).send(toUpdate)
  }catch(error){
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try{
    const deletedItem = await Tasks.findByIdAndDelete(_id)
    if(!deletedItem)
      return res.status(404).send({error: 'No item found by the given id'})
    
    res.status(200).send(deletedItem)
  }catch(error){
    res.status(500).send(error)
  }
})

module.exports = router;