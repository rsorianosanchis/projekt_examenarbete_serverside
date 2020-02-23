// invocamos al orm de mongoose para hacer las consultas a la DB
const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
//
// get enviroment data igenom dotenv package..env ska vara olika beroende dev och production in hosting
require('dotenv').config({ path: 'var.env' });
//
//conexion till DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGOATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.info('Data Base kopplad med server');
  } catch (error) {
    console.log(error);
    process.exit(1); // code for stoppa node körning
  }
};

module.exports = connectDB;
