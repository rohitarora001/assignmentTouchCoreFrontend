import React, { useReducer } from 'react'
import FormContext from './formContext'
import Reducer from './formReducer'
const initialState = {
    formData: null,
    currentFormData: null
};

const FormState = ({ children }) => {
    const [formState, dispatch] = useReducer(Reducer, initialState)
    return (
        <FormContext.Provider value={[formState, dispatch]}>
            {children}
        </FormContext.Provider>
    )
}

export default FormState