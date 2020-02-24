const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //https://stackoverflow.com/a/41596974
    ref: 'User' //https://mongoosejs.com/docs/2.7.x/docs/populate.html
  },
  created: {
    type: Date,
    default: Date //.now()
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
