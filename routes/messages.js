/*  
  Path: /api/messages  
*/


const { Router, response } =  require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/messages');

const router = Router();


router.get('/:from', validateJWT, getChat);

module.exports = router;
