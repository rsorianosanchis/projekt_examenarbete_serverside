const express = require('express');
const connectDB = require('./config/db');

//server
const server = express();

//conectar base de datos
connectDB();

//enable express.json() för att göra parse inkomande data
server.use(express.json({ extended: true }));

//server port . Heroku väntar
const PORT = process.env.PORT || 4000;

//importing routers/ midlewares
server.use('/backend/user', require('./routes/user'));
server.use('/backend/auth', require('./routes/auth'));
server.use('/backend/project', require('./routes/project'));
server.use('/backend/task', require('./routes/task'));

// kör server

server.listen(PORT, () => {
  console.log(`Server kör i PORT ${PORT}`);
});
