// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();

    const handleLogin = () => {
        history.push('/login'); // Navigate to the login page
    };

    const handleSignup = () => {
        history.push('/signup'); // Navigate to the signup page
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Our Social Media App</h1>
            <button style={styles.button} onClick={handleLogin}>
                Login
            </button>
            <button style={styles.button} onClick={handleSignup}>
                Signup
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
    },
};

export default Home;
