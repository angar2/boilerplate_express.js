import { GET_COMMENTS } from "../_actions/types";

export default function(state = {}, action) {
    switch(action.type) {
        case GET_COMMENTS: 
            return { ...state, comments: action.payload.comments };
            break;
        default:
            return state;
    };
};