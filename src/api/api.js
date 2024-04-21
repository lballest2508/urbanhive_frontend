import axios from 'axios';


export const urbanHiveApi = axios.create({
    baseURL: 'http://localhost:8000/api'
});