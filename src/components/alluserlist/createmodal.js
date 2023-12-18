// CreateUserModal.js
import React, { useState } from 'react';
import './UserList.css';

const CreateUserModal = ({ onClose, onCreate }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    gender: '',
    age: '',
    status: '',
  });

  const handleChange = (field, value) => {
    setNewUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleCreate = () => {
    if (!newUser.name || !newUser.username || !newUser.email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Call the onCreate prop with the new user details
    onCreate(newUser);

    // Close the modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create User</h3>
        <label>
          Name:
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={newUser.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={newUser.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={newUser.age}
            onChange={(e) => handleChange('age', e.target.value)}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={newUser.status}
            onChange={(e) => handleChange('status', e.target.value)}
          />
        </label>
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateUserModal;
