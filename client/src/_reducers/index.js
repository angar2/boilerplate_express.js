import { combineReducers } from "redux";
// combineReducers: 여러개의 reducer를 하나로 합쳐주는 기능 -> rootReducer
import user from './user_reducer';
import video from './video_reducer';
import comment from './comment_reducer';

const rootReducer = combineReducers({
    userReducer: user,
    videoReducer: video,
    commentReducer: comment
});

export default rootReducer;