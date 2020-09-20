import { usersAPI } from "../DAL/api";

const SET_USERS = 'test/usersDataReduser/SET_USERS',
    SET_USERS_COPY = 'test/usersDataReduser/SET_USERS_COPY',
    SET_PROGRESS = 'test/usersDataReduser/SET_PROGRESS',
    SET_SELECTED_USER = 'test/usersDataReduser/SET_SELECTED_USER',
    ADD_USER = 'test/usersDataReduser/ADD_USER',
    SEARCH_SYMBOLS = 'test/usersDataReduser/SEARCH_SYMBOLS',
    NEW_CURRENT_PAGE = 'test/usersDataReduser/NEW_CURRENT_PAGE',
    ERROR = 'test/usersDataReduser/ERROR';

const initialState = {
    users: [],
    inProgress: false,
    selectedUser: null,
    searchSymbols: "",
    currentPage: 1,
    usersPerPage: 10,
    modifiedUsers: [],
    error: false
}



const usersDataReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                modifiedUsers: action.users
            }
        case SET_USERS_COPY:
            return {
                ...state,
                modifiedUsers: action.users
            }
        case SET_PROGRESS:
            return {
                ...state,
                inProgress: action.progress
            }
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.user

            }
        case ADD_USER:
            const userData = {
                id: action.data.id - Math.random(),
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                email: action.data.email,
                phone: action.data.phone,
                address: {},
                description: null
            }
            return {
                ...state,
                users: [userData, ...state.users],
                modifiedUsers: [userData, ...state.users]
            }
        case SEARCH_SYMBOLS:
            const { symbols } = action;
            const users = Object.create(state.users)
            let modifiedUsers = users
            const searchUsersArr = (items, searchSymbols) => {
                if (searchSymbols.length === 0) {
                    return items
                }
                return items.filter(item => {
                    return String(item.id).indexOf(searchSymbols) > -1
                        || item.firstName.indexOf(searchSymbols) > -1
                        || item.lastName.indexOf(searchSymbols) > -1
                        || item.email.indexOf(searchSymbols) > -1
                        || item.phone.indexOf(searchSymbols) > -1
                })
            }
            if (symbols) {
                modifiedUsers = searchUsersArr(modifiedUsers, symbols);
            } else {
                modifiedUsers = users;
            }

            return {
                ...state,
                searchSymbols: symbols,
                modifiedUsers,
                currentPage: 1
            }

        case NEW_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case ERROR: {
            return {
                ...state,
                error: true
            }
        }
        default:
            return state
    }
}
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setUsersCopy = (users) => ({ type: SET_USERS_COPY, users });
export const setProgress = (progress) => ({ type: SET_PROGRESS, progress });
export const setSelectedUser = (user) => ({ type: SET_SELECTED_USER, user });
export const addUser = (data) => ({ type: ADD_USER, data });
export const userSearch = (symbols) => ({ type: SEARCH_SYMBOLS, symbols });
export const newCurrentPage = (page) => ({ type: NEW_CURRENT_PAGE, page })
export const setError = () => ({ type: ERROR });

export const getUsers = (url) => async (dispatch) => {
    try {
        dispatch(setProgress(true))
        dispatch(newCurrentPage(1));
        const response = await usersAPI.getUsers(url);
        dispatch(setUsers(response.data))
        dispatch(setProgress(false))

    } catch (e) {
        dispatch(setError())
    }
}
export default usersDataReduser;