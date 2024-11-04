// frontend/src/redux/userReducer.js

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
        case 'USER_REGISTER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_LOGIN_SUCCESS':
        case 'USER_REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                error: null,
            };
        case 'USER_LOGIN_FAIL':
        case 'USER_REGISTER_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default userReducer;
