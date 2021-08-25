import axios from 'axios';
import authHeader from './auth-header';

const TEST_API_URL = 'http://localhost:8080/api/test/';
const API_URL = 'http://localhost:8080/api/task';

class UserService {
    getPublicContent() {
        return axios.get(TEST_API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(TEST_API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(TEST_API_URL + 'admin', { headers: authHeader() });
    }

    getTasks(){
        return axios.get(API_URL, {headers: authHeader()});
    }
}

export default new UserService();