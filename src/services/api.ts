import axios from 'axios';
import { store } from '../store';

export interface ApiError {
    Mensagem: string;
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL
        : 'https://rxcrud-api-template.herokuapp.com/'
});

const { dispatch } = store;

api.interceptors.request.use(async config => {
    let token = null;
    let rxcrud = localStorage.getItem('persist:rxcrud');

    if (rxcrud) {
        token = JSON.parse(rxcrud).token.replaceAll('"', '');
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                dispatch({ type: 'LOG_OUT_EXPIRED' });
                break;
            case 403:
                error.response.data = { Mensagem: 'Usuário logado não tem permissão para realizar essa ação.' };
                break;
            default:
                break;
        }
    }

    return Promise.reject(error);
});

export default api;