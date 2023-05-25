import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceForm.css"

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

function UpdatePlace() {

    const [isLoading, setIsLoading] = useState(false);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(true);
    }, [setFormData, identifiedPlace])


    function placeUpdateSubmitHandler(event) {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return <div className="center">
            <Card>
                <h2>Could not find that place!</h2>
            </Card>
        </div>
    }

    if (!isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }
    return <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valifd title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
}
export default UpdatePlace

//useParams is used to take values from url
