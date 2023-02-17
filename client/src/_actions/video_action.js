import axios from "axios";
import { FILEINFO_VIDEO, FILEINFO2_VIDEO } from "./types";

export function fileInfoVideo(formData, config) {
    const req = axios.post('/api/video/uploadFile', formData, config)
      .then(res => res.data);
    return {
        type: FILEINFO_VIDEO,
        payload: req
    }
};

export function fileInfoVideo2(body) {
    const req = axios.post('/api/video/thumbnail', body)
      .then(res => res.data);
    return {
        type: FILEINFO2_VIDEO,
        payload: req
    }
};

// export function authUser(body) {
//     const req = axios.get('/api/user/auth')
//       .then(res => res.data);
//     return {
//         type: AUTH_USER,
//         payload: req
//     }
// };