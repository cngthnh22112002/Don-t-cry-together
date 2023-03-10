const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: 50,
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    enum: ['janitor', 'collector', 'backofficer','admin'],
    default: 'janitor',
  },
  phone: {
    type: String,
    required: false,
    default: ""
  },
  currentVehicle: {
    type: Number,
    required: true,
    default: 0,
    min:0
  },
}
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})




UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}
  )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
