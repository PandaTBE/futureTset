import * as axios from 'axios';

export const usersAPI = {
    getUsers(url) {
        return axios.get(url)
    }
}