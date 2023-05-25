import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
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
    },
    {
        id: "p2",
        title: "Rajkot 2.0",
        description: "One of the best city in gujarat and my home city",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/High_street_-_150_ft_Ring_road_Rajkot.jpg/200px-High_street_-_150_ft_Ring_road_Rajkot.jpg",
        address: "Rajkot, Gujarat, India",
        location: {
            lat: 22.273487,
            lng: 70.8212963,
        },
        creator: "u2",
    },
];

function UserPlaces() {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;

//useParams hook is only used in functional components
//it takes the value from url
//Here we have use useParams().userId because we have named it as /:userId/places in app.js