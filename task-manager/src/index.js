const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/tasks')

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log('running server in port' + port)
})

app.use(express.json());

app.post('/users', async (req, res) => {
  console.log(req.body)
  const user =  new User(req.body)
  try{
    await user.save()
    res.status(201).send(user)
  }catch(error){
    res.status(500).send(error)
  }
});

app.get('/users', async (req, res) => {
  try{
    const response = await User.find({})
    res.status(200).send(response)
  }catch(error){
    res.status(500).send(error)
  }
})

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try{
   const userFound = await User.findById(_id);
    if(!userFound){
      return res.status(404).send('No user found')
    }

    res.send(userFound)
  }
  catch(error){
    res.status(500).send(error)
  }
})

app.post('/tasks', async (req, res) => {
  console.log(req.body)
  const task = new Tasks(req.body)

  try{
    await task.save()
    res.status(201).send(task)
  }catch(error){
    res.status(400).send(error)
  }
})

app.get('/tasks', async (req, res) => {

  try{
    const tasks = await Tasks.find({})
    res.status(200).send(tasks)
  }catch(error){
    res.status(404).res.send(error)
  }
})

app.get('/tasks/:id', async (req, res) => {
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