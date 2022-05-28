const mongoose = require('mongoose');
const {isEmail} = require('validator')

const User = mongoose.model('User', {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email:{
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if(!isEmail(value)){
          throw new Error('Ivalid Email')
        }
        return true 
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if(value < 0)
          throw new Error('Numbers must be greater than 0')
        return true
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if(!(value.length > 6))
          throw new Error('Password must be grater than 6 characters!')
        if(value === 'password')
          throw new Error("Password must not be 'password'")
        return true
      }
    }
  });
  
  module.exports = User;