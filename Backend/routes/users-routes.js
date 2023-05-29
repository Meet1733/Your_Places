const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post('/signup',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() //Test@test.com => test@test.com
            .isEmail(),
        check('password')
            .isLength({ min: 8 })
    ], usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;

//here we are using getPlaceById as pointer so we do not have to call it as a function