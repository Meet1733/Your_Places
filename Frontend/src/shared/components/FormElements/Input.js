import React, { useEffect, useReducer } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    function changeHandler(event) {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        })
    }

    function touchHandler() {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />)
        : (<textarea
            id={props.id}
            rows={props.row || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />);

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
}

export default Input

//useReducer is same as useState but it is used to write complex state with ease and can also write logic
//It is used when we have more complex state or interconnected state
//whenever we change in input field , we call dispatch function of useReducer with changes the state and store it in inputState and we rerender it
// ...state is used to store the previous value of state i.e, it stores all the value of state
// here isState consist of value , isValid , isTouched
//Will only give error is input is invalid once user has touched the input field
//useEffect is used to run a function when specified dependency changes here it is id, value, isValid, onInput
//we will pass the value back to NewPlaces.js