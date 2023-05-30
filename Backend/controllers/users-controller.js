const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

async function getUsers(req, res, next) {

    let users;

    try {
        users = await User.find({}, '-password'); //It will only return email and name
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.', 500
        );
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

async function signup(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        );
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.', 500
        )
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead', 422
        )
        return next(error);
    }

    const createdUser = new User({
        name,  //name: name
        email,
        image: 'https://avatars.githubusercontent.com/u/112953572?v=4',
        password,
        places: []
    })

    try {
        await createdUser.save();  //.save is used by mongodb to create the data
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again',
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.', 500
        )
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not login.', 401
        )
        return next(error);
    }

    res.json({ message: 'Logged in!' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;