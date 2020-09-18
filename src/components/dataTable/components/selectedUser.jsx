import React from 'react'

const SelectedUser = ({ firstName, description, address }) => {
    return (
        <div>
            <b>Selected User:</b>
            <div>{firstName}</div>
            <b>Description:</b>
            <div>{description}</div>
            <b>Residence address:</b>
            <div>{address.streetAddress}</div>
            <div><b>City: </b>{address.city}</div>
            <div><b>State: </b>{address.state}</div>
            <div><b>Zip: </b>{address.zip}</div>

        </div>
    );
}

export default SelectedUser;