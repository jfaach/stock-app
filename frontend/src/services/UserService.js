import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class UserService {
    updateUser(email) {
        const url = `${API_URL}/api/core/users/`;
        return axios.put(url, {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).catch(
            function (error) {
                console.log('Show error notification!')
                return false
            }
        )
    }
}