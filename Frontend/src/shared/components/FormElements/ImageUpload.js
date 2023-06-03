import React, { useRef } from "react";

import Button from "./Button";
import './ImageUpload.css';

function ImageUpload(props) {
    const filePickerRef = useRef();

    function pickedHandler(event) {
        console.log(event.target)
    }

    function pickImageHandler() {
        filePickerRef.current.click(); //whenever we click button, we open input field
    }

    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    <img src="" alt="Preview" />
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
        </div>
    );
}

export default ImageUpload;