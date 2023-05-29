const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // /api/places/...
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {  //this is for route errors
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {  //will run if any middleware causes error
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' });
})

app.listen(5000);

//express will only forward to placesRoutes if the request is /api/places
//If we provide 4 parameters to middleware function then express will recognize it as a special function
//as error handling middleware function