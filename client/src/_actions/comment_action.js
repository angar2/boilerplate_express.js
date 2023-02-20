import axios from "axios";
import { GET_COMMENTS } from "./types";

export function getComments(body) {
    const req = axios.post('/api/comment/getComments', body)
      .then(res => res.data);
    return {
        type: GET_COMMENTS,
        payload: req
    }
};