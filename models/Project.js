const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //https://stackoverflow.com/a/41596974 // ojo! cuando cargas una variable de otra coleccion aunque pareza un string es un objeto, y luego si lo usas para comparar tienes que pasarlo a string con el metodo .toString()
    ref: 'User' //https://mongoosejs.com/docs/2.7.x/docs/populate.html
  },
  created: {
    type: Date,
    default: Date //.now()
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
