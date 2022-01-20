/*
 path: api/login

*/


const { Router, response } =  require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
    check("name", "Name is mandatory.").not().isEmpty(),
    check("email", "Email is not correct.").isEmail(),
    check("password", "Password is not correct.").not().isEmpty().isLength(6),
    validateFields
], crearUsuario);


router.post('/', [
    check("email", "Email is not correct.").isEmail(),
    check("password", "Password is not correct.").not().isEmpty().isLength(6),
    validateFields
], login);

router.get('/renew',validateJWT, renewToken );

module.exports = router;
