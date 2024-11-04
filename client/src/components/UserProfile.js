import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            {user ? (
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <p>Email: {user.email}</p>
                    {/* Add other user information */}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
