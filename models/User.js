const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true // solo puede haber uno en la DB
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UsersSchema);
