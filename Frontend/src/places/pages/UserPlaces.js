import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

function UserPlaces() {

    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        async function fetchPlaces() {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) {
            }
        }
        fetchPlaces();
    }, [sendRequest, userId])

    function placeDeleteHandler(deletedPlaceId) {
        setLoadedPlaces(prevPlace => prevPlace.filter(
            place => place.id !== deletedPlaceId
        ))
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className="center"><LoadingSpinner asOverlay /></div>}
            {!isLoading && loadedPlaces &&
                <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />};
        </React.Fragment>
    )
}

export default UserPlaces;

//useParams hook is only used in functional components
//it takes the value from url
//Here we have use useParams().userId because we have named it as /:userId/places in app.js