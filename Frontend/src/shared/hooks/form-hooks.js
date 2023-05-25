import { useCallback, useReducer } from "react"

function formReduceer(state, action) {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }

        default:
            return state
    }
}

export const useForm = (initialInput, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReduceer, {
        inputs: initialInput,
        isValid: initialFormValidity //Validity of entire form
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formValidity: formValidity
        })
    }, []);

    return [formState, inputHandler, setFormData];
};

//custom hooks name must start with lowercase use