const User = require("../models/user")
const express =  require('express');
const router = new express.Router();

router.post('/users', async (req, res) => {
  console.log(req.body)
  const user =  new User(req.body)
  try{
    await user.save()
    res.status(201).send(user)
  }catch(error){
    res.status(500).send(error)
  }
});

router.get('/users', async (req, res) => {
  try{
    const response = await User.find({})
    res.status(200).send(response)
  }catch(error){
    res.status(500).send(error)
  }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperator = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperator)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try{
    
    const user = await User.findById(_id);
    updates.forEach((update) => user[update] =  req.body[update])
    await user.save()

      if(!user)
        return res.status(404).send()
    
      res.status(200).send(user)
  }catch(error){
    res.status(500).send(error)
  }
})

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try{
    const deletedItem = await User.findByIdAndDelete(_id)
    if(!deletedItem)
      return res.status(404).send({error: 'No item found by the given id'})
    
    res.status(200).send(deletedItem)
  }catch(error){
    res.status(500).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try{
    const credentials = await User.findByCredentials(req.body.email, req.body.password);
    res.send(credentials);
  }catch(error){
    res.status(400).send(error)
  }
})

module.exports = router;