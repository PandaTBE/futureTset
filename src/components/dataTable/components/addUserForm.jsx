import React from "react";
import { useDispatch } from "react-redux";
import { reduxForm, reset } from "redux-form";
import { createField, Input, required } from "../../formsControl/fromsControl";
import { addUser } from "../../redux/usersDataReduser";
import styled from 'styled-components';

const TableHeader = styled.div`
padding: 10px;
display: flex;
justify-content:center;
align-items: center;
`
const TableItem = styled.div`
border: 1px solid black;
flex:0 0 20%;
text-align: center;
border-right: none;
&:last-child {
    border: 1px solid black;
}
`
const Form = styled.form`
display: flex;
justify-content:center;
align-items: center;
flex-wrap: wrap;
`
const FormItem = styled.div`
flex:0 0 20%;
`

const AddUserForm = ({ handleSubmit }) => {
    const headerArray = ['id', 'firstName', 'lastName', 'email', 'phone']
    const newHeaderArray = headerArray.map(item => <TableItem key={item}>{item}</TableItem>)
    return (
        <div>
            <TableHeader>{newHeaderArray}</TableHeader>
            <Form onSubmit={handleSubmit}>
                <FormItem>{createField('id', 'id', [required], Input, { type: "number" })}</FormItem>
                <FormItem>{createField('First name', 'firstName', [required], Input, { type: 'text' })}</FormItem>
                <FormItem>{createField('Last name', 'lastName', [required], Input, { type: 'text' })}</FormItem>
                <FormItem>{createField('email', 'email', [required], Input, { type: 'email' })}</FormItem>
                <FormItem>{createField('phone', 'phone', [required], Input, { type: 'text' })}</FormItem>
                <button>submit</button>
            </Form>
        </div>
    )
}
const AddUserReduxForm = reduxForm({ form: 'addUser' })(AddUserForm);

const UserForm = () => {

    const dispatch = useDispatch();
    const submitForm = (formData) => {
        dispatch(addUser(formData));
        dispatch(reset('addUser'))
    }

    return (
        <div>
            <AddUserReduxForm onSubmit={submitForm} />
        </div>
    )
}
export default UserForm;

