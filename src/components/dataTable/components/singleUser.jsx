import React from 'react';
import styled from 'styled-components/macro';
const Container = styled.div`
max-width:1140px;
margin:0 auto;
`
const UserWrapper = styled.div`
padding: 0 10px;
display: flex;
justify-content:center;
align-items: center;
`

const UserInfo = styled.div`
border: 1px solid black;
flex:0 0 20%;
overflow: hidden;
text-align: center;
border-right: none;
margin-bottom: 5px;
&:last-child {
    border: 1px solid black;
}
`

const SingleUser = ({ user, ...props }) => {

    const onClick = user => () => {
        props.onClick(user)
    }
    return (
        <Container onClick={onClick(user)}>
            <UserWrapper>
                <UserInfo>{user.id}</UserInfo>
                <UserInfo>{user.firstName}</UserInfo>
                <UserInfo>{user.lastName}</UserInfo>
                <UserInfo>{user.email}</UserInfo>
                <UserInfo>{user.phone}</UserInfo>
            </UserWrapper>
        </Container>
    );
}

export default SingleUser;