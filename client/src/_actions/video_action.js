import axios from "axios";
import { FILEINFO_VIDEO, FILEINFO2_VIDEO, GET_VIDEOS, GET_VIDEO } from "./types";

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

export function getVideos() {
    const req = axios.get('/api/video/getVideos')
      .then(res => res.data);
    return {
        type: GET_VIDEOS,
        payload: req
    }
};

export function getVideo(body) {
  const req = axios.post('/api/video/getVideo', body)
    .then(res => res.data);
  return {
      type: GET_VIDEO,
      payload: req
  }
};