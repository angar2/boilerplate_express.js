import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(body) {
    const req = axios.post('/api/user/login', body)
      .then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: req
    }
};

export function registerUser(body) {
    const req = axios.post('/api/user/register', body)
      .then(res => res.data);
    return {
        type: REGISTER_USER,
        payload: req
    }
};

export function authUser(body) {
    const req = axios.get('/api/user/auth')
      .then(res => res.data);
    return {
        type: AUTH_USER,
        payload: req
    }
};