import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

const NormalInput = styled.input`
width:100%;
box-sizing:border-box;
`
const InputError = styled.input`
box-sizing:border-box;
border: 2px solid #ff0000;
width:100%;
`


export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            {hasError ? <InputError {...input} {...props} /> : <NormalInput {...input} {...props} />}
            <div>{hasError && <span>{meta.error}</span>}</div>
        </div>
    )
}

export const createField = (placeholder, name, validators, component, propsSettings = {}) => {
    return (
        <div>
            <Field {...propsSettings}
                name={name}
                placeholder={placeholder}
                validate={validators}
                component={component} />
        </div>
    )
}

export const required = (value) => {
    if (value) return undefined
    return "The field is required"
}