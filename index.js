const express = require('express');
const path = require('path');
require('DOTENV').config();

//DB CONFIG
const { dbConnection } = require('./database/config');
dbConnection();

//APP ESPRESS
const app = express();

// Lectura y parso del Body
app.use(express.json());

//NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//PATH PUBLICA
const publicPath = path.resolve( __dirname, 'public' );


//Mis rutas
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/messages', require('./routes/messages') );


app.use(express.static(publicPath));

server.listen( process.env.PORT, ( err ) => {
    if( err ) throw new Error(err);
    console.log('servidor corriendo en el puerto', process.env.PORT);
});