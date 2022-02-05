const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConected, userDisconnected, saveMessage} =  require('../controllers/socket');
//Mensajes de SOckets
io.on('connection', client =>  {
    console.log('Cliente conectado');

    const [valid, uid] = validateJWT(client.handshake.headers['x-token']);

    if(!valid) { return client.disconnect();}

    userConected(uid);

    console.log('CLiente autenticado');
    client.on('disconnect', () => { 
        userDisconnected(uid);
    });

    client.join(uid);

    client.on('personal-message', async (payload)=>{
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensajeee!!', payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });
});

