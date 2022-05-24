const mongoose = require('mongoose');
const {isEmail} = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email:{
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if(!isEmail(value)){
//         throw new Error('Ivalid Email')
//       }
//       return true 
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if(value < 0)
//         throw new Error('Numbers must be greater than 0')
//       return true
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     validate(value) {
//       if(!(value.length > 6))
//         throw new Error('Password must be grater than 6 characters!')
//       if(value === 'password')
//         throw new Error("Password must not be 'password'")
//       return true
//     }
//   }
// });

// const me =  new User({
//   name: 'fred',
//   email: 'something@gmial.com',
//   age: 25,
//   password: '1234asdeva^' 
// })

// me.save().then(result => console.log(result)).catch(error => console.log(error))

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const feedPet = new Tasks({
  description: 'feed the pets',
})

const cleanHouse = new Tasks({
  description: 'Clean my house',
  completed: true
})

cleanHouse.save();
feedPet.save().then(result => console.log(result)).catch(error => console.log(error))