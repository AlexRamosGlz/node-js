require('../db/mongoose');
const tasks = require('../models/tasks')

const deletAndCountTask = async (description) => {
  const data = {
    user: {},
    count: undefined
  }

  data.user = await tasks.deleteMany({ description: description})
  data.count = await tasks.countDocuments({ completed: false})
  return data;
}

deletAndCountTask('feed the pets').then(succes => console.log(succes)).catch(err => console.log(err))