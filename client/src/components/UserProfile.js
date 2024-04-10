import React, { useState } from 'react';
import Button from './Button';

const UserProfile = () => {
    const [avatar, setAvatar] = useState('');

    // State variable for edit mode
    const [editMode, setEditMode] = useState(false);

    const handleEdit = (event) => {
        event.preventDefault();
        // handle form edit, e.g., send data to backend API
        console.log('Edited:', { avatar });
        // For now, we'll just toggle edit mode off
        setEditMode(false);
    };

    // Function to toggle edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div>
            <h2>User Profile</h2>
            <h3>Username</h3>
            {editMode ? (
                <form onSubmit={handleEdit}>
                    <div>
                        <label>Avatar:</label>
                        <select
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        >
                            <option value="avatar1">Avatar 1</option>
                            <option value="avatar2">Avatar 2</option>
                            <option value="avatar3">Avatar 3</option>
                            <option value="avatar4">Avatar 4</option>
                            <option value="avatar5">Avatar 5</option>
                        </select>
                    </div>
                    <Button buttonText="Save Changes" type="submit" />
                    <Button buttonText="Cancel"type="button" onClick={toggleEditMode} />
                </form>
            ) : (
                <div>
                    <p>Avatar: {avatar}</p>
                    <Button buttonText="New Avatar" onClick={toggleEditMode} />
                </div>
            )}
        </div>
    );
};

export default UserProfile
