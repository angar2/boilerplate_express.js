import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(body) {
    const req = axios.post('/api/user/login', body)
      .then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: req
    }
};