/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';
import { getUsers, newCurrentPage, setSelectedUser, setUsers, userSearch } from '../redux/usersDataReduser';
import styled from 'styled-components/macro';
import SingleUser from './components/singleUser';
import SelectedUser from './components/selectedUser';
import UserForm from './components/addUserForm';
import UserSearch from './components/searchForm';
import Paginator from '../paginator/paginator';

const Container = styled.div`
max-width:1140px;
margin:0 auto;
`
const Error = styled.div`
text-align:center;
color: red;
`
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

const DataTable = () => {
    const [sortModeId, editSortModeId] = useState(false);
    const [sortModeFirstName, editSortModeFirstName] = useState(false);
    const [sortModeLastName, editSortModeLastName] = useState(false);
    const [sortModeEmail, editSortModeEmail] = useState(false);
    const [sortModePhone, editSortModePhone] = useState(false);
    const [addUserMode, editAddUserMode] = useState(false);
    const [usersOnSinglePage, setUsersOnSinglePage] = useState([]);
    const inProgress = useSelector(state => state.usersData.inProgress);
    const { selectedUser, modifiedUsers, currentPage, usersPerPage, error } = useSelector(state => state.usersData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        setUsersOnSinglePage(modifiedUsers.slice(indexOfFirstUser, indexOfLastUser))
    }, [modifiedUsers, currentPage]);

    const usersSortFn = (sortMode, newArr, editUser, item) => {
        if (sortMode) {
            dispatch(setUsers((newArr.sort((a, b) => a[String(item)] > b[String(item)] ? -1 : 1))));
            editUser(false);
        } else {
            dispatch(setUsers((newArr.sort((a, b) => a[String(item)] > b[String(item)] ? 1 : -1))));
            editUser(true);
        }
    }
    const usersSort = (usersArr, item) => () => {
        const newArr = [...usersArr];
        if (item === 'id') {
            usersSortFn(sortModeId, newArr, editSortModeId, item)
        } else if (item === 'firstName') {
            usersSortFn(sortModeFirstName, newArr, editSortModeFirstName, item)
        } else if (item === 'lastName') {
            usersSortFn(sortModeLastName, newArr, editSortModeLastName, item)
        } else if (item === 'email') {
            usersSortFn(sortModeEmail, newArr, editSortModeEmail, item)
        } else if (item === 'phone') {
            usersSortFn(sortModePhone, newArr, editSortModePhone, item)
        }
    }
    const selectUser = (user) => {
        dispatch(setSelectedUser(user))
    }

    const onAddUserClick = () => {
        if (addUserMode) {
            editAddUserMode(false)
        } else {
            editAddUserMode(true)
        }

    }
    const usersArr = usersOnSinglePage.map((user, i) => {
        return (
            <SingleUser
                onClick={selectUser}
                key={`${i}-${Math.random()}`}
                user={user}
            />
        )
    })
    const searchUsers = (searchSymbols) => {
        if (searchSymbols) {
            dispatch(userSearch(searchSymbols));
        } else {
            dispatch(userSearch(''));
        }

    }
    const paginate = pageNum => {
        dispatch(newCurrentPage(pageNum));

    }
    return (

        <Container>
            <div>
                <button onClick={onAddUserClick}>add user</button>
                {addUserMode && <UserForm />}
            </div>
            <UserSearch searchUsers={searchUsers} />
            <TableHeader >
                <TableItem
                    onClick={usersSort(modifiedUsers, 'id')}>{`id ${sortModeId ? '▲' : '▼'}`}
                </TableItem>
                <TableItem
                    onClick={usersSort(modifiedUsers, 'firstName')}>{`firstName ${sortModeFirstName ? '▲' : '▼'}`}
                </TableItem>
                <TableItem
                    onClick={usersSort(modifiedUsers, 'lastName')}>{`lastName ${sortModeLastName ? '▲' : '▼'}`}
                </TableItem>
                <TableItem
                    onClick={usersSort(modifiedUsers, 'email')}>{`email ${sortModeEmail ? '▲' : '▼'}`}
                </TableItem>
                <TableItem
                    onClick={usersSort(modifiedUsers, 'phone')}>{`phone ${sortModePhone ? '▲' : '▼'}`}
                </TableItem>
            </TableHeader>
            {error
                ? <Error>Server error</Error>
                :
                <div>

                    {inProgress ? <Preloader /> : usersArr}
                    <Paginator
                        usersPerPage={usersPerPage}
                        totalUsers={modifiedUsers.length}
                        paginate={paginate}
                        currentPage={currentPage} />
                    {selectedUser && <SelectedUser
                        firstName={selectedUser.firstName}
                        description={selectedUser.description}
                        address={selectedUser.address} />}
                </div>}

        </Container>
    );
};

export default DataTable