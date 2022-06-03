const mongoose = require('mongoose')
const { Schema } = mongoose;

const taskSchema =new Schema({
  description: {
    type: String,
    required: [true, "Desciption can't be empty"],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}) 

const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks;