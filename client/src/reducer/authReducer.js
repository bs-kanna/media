const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, loading: false };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default authReducer;
