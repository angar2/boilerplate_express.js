import { FILEINFO_VIDEO, FILEINFO2_VIDEO, GET_VIDEOS, GET_VIDEO } from "../_actions/types";

export default function(state = {}, action) {
    switch(action.type) {
        case FILEINFO_VIDEO: 
            return { ...state, fileInfo: action.payload };
            break;
        case FILEINFO2_VIDEO: 
            return { ...state, fileInfo2: action.payload };
            break;
        case GET_VIDEOS: 
            return { ...state, videos: action.payload.videos };
            break;
        case GET_VIDEO: 
            return { ...state, video: action.payload.video };
            break;
        default:
            return state;
    };
};