const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Rajkot",
        description: "One of the best city in gujarat and my home city",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/High_street_-_150_ft_Ring_road_Rajkot.jpg/200px-High_street_-_150_ft_Ring_road_Rajkot.jpg",
        address: "Rajkot, Gujarat, India",
        location: {
            lat: 22.273487,
            lng: 70.8212963,
        },
        creator: "u1",
    }
]

function getPlaceById(req, res, next) {
    const placeId = req.params.pid; //{pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    res.json({ place });
}

function getPlacesByUserId(req, res, next) {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })

    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find places for the provided user id.', 404)
        );
    }

    res.json({ places });
}

async function createPlace(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { title, description, address, creator } = req.body; //const title = req.body.title

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }


    const createdPlace = {
        id: uuid(),
        title,  //title: title, notation and data is same
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);

    console.log(createdPlace);

    res.status(201).json({ place: createPlace });
}

function updatePlaceById(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }; //We can write this short form for returning one statement
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
}

function deletePlace(req, res, next) {
    const placeId = req.params.pid;

    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place for that id.', 404)
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted Place' });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

//req.params is used to take values from url
//res.json({place}) => javascript will convert it to {place: place};
//throw cancels the function eexecution while next does not
//so we need to return next else there there will be two things that will return and cause error
//we can use exports.name for multiple exports rather than module.exports
// ... is used to create a new copy of the same place
// const store the address of the object not the actual object that's why we can change it's value
//using express-validator, a third party library for validation