import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
// import other reducers as needed

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    // add other reducers
});

export default rootReducer;
