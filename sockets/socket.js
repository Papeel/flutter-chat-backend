const { io } = require('../index');
//Mensajes de SOckets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { console.log('cliente desconectado') });
    client.on('mensaje', ( payload ) => {
        console.log('Mensajeee!!', payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });
});

