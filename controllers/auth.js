const { response } =  require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User  = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res= response) => {

    const {email, password} = req.body;

    try {
        const emailExists = await User.findOne({email});
        if( emailExists ) {
            return res.status(400).json({
                ok:false,
                msg: "The email is registered"
            });
        }

        const user = new User( req.body );
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT( user.id );
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    } 
};


const login = async (req, res= response) => {
    const {email, password} = req.body;
    try {

        const userDB = await User.findOne({email});

        if(!userDB) 
            return res.status(404).json({
                ok:false,
                msg: 'Email not found'
            });

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword)
            return res.status(404).json({
                ok:false,
                msg: 'Password error'
            });

        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            user: userDB,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Database connection error.'
        });
    }
}


const renewToken = async (req, res = response ) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    try {
        const userDB = await User.findById(uid);
        res.json({
            ok: true,
            user: userDB,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Database error'
        })
    }
    
}

module.exports = {
    crearUsuario,
    login,
    renewToken
};