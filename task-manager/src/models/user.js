const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrpyt = require('bcryptjs')
const jw =  require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
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
  },
  tokens: [{
    token: {
      required: true,
      type: String,
    }
  }]
})

userSchema.pre('save', async function(next){
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrpyt.hash(user.password, 8);
  }

  return next()
})

userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jw.sign({"_id": user._id.toString()}, 'nodecourse', {expiresIn: '7 days'});

  user.tokens = user.tokens.concat({ token })

  return {token};
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user)
    throw new Error('Unable to logIn, Check Your Credentials')

  const isMatch = bcrpyt.compare(password, user.password)

  if(!isMatch)
    throw new Error('Unable to logIn, Check Your Credentials')

  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;