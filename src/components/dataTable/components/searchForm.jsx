import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input } from '../../formsControl/fromsControl';
import styled from 'styled-components';

const Form = styled.form`
display:flex;
`
const FormInput = styled.div`
flex: 0 0 80%;
`
const FormBtn = styled.button`
flex: 0 0 20%;
`

const SearchUsersForm = ({ handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormInput>{createField('Search', 'search', [], Input)}</FormInput>

            <FormBtn>search</FormBtn>
        </Form>
    )
}
const SearchUsersReduxForm = reduxForm({ form: 'search' })(SearchUsersForm);

const UserSearch = (props) => {
    const onSearch = (formData) => {
        const { search } = formData
        props.searchUsers(search);
    }
    return (
        <SearchUsersReduxForm onSubmit={onSearch} />
    )
}
export default UserSearch;