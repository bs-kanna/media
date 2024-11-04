import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token, userId } = response.data;

        // Save token in local storage or context for authenticated sessions
        localStorage.setItem('token', token);
        
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { userId, token },
        });
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: error.response ? error.response.data : 'Server error',
        });
    }
};
