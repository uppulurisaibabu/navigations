// UserList.js
import React, { useState, useEffect } from 'react';
import './UserList.css'; // Import custom CSS
// import '../json files/users'
const UserList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedUsers, setSortedUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [userList, setUserList] = useState(users);
  const [selectedRow, setSelectedRow] = useState([]);
  const [editId, setEditId] = useState(-1)

  const [updatedata, setUpdatedata] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    Gender: '',
    Age: '',
    status: ''
  });

  const [newUserData, setNewUserData] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    Gender: '',
    Age: '',
    status: ''
  });
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  const handleAddUser = () => {
    // // Assuming you have a function to generate a unique ID for the new user
    // const newUserId = generateUniqueId();

    // Creating a new user object with the entered data and the generated ID

    const newUserId = sortedUsers.length > 0 ? sortedUsers[sortedUsers.length - 1].id + 1 : 1;

    const newUser = {
      id: newUserId,
      name: newUserData.name,
      username: newUserData.username,
      email: newUserData.email,
      Gender: newUserData.Gender,
      Age: newUserData.Age,
      status: newUserData.status
    };
    if (!newUser.name || !newUser.username || !newUser.email) {
      alert('Please fill in all required fields.');
      return;
    }
    // Updating the state with the new user
    setSortedUsers([...sortedUsers, newUser]);

    localStorage.setItem('usersData', JSON.stringify([...sortedUsers, newUser]));

    // Resetting the newUserData state
    setNewUserData({
      name: '', username: '', email: '', Gender: '', Age: '', status: ''
    });

    
    // Close the create form
    setCreateFormOpen(false);
    saveDataToLocalStorage([...sortedUsers, newUser]);
  };

  useEffect(() => {
    // 
    const storedUsers = JSON.parse(localStorage.getItem('usersData')) || users;
    // setSortedUsers(storedUsers);
    setSortedUsers(storedUsers);
  }, [users]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sorting
  const handleSort = (key) => {
    const sorted = [...sortedUsers].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setSortedUsers(sorted);
  };
  const handleSort1 = (key) => {
    const sorted = [...sortedUsers].sort((a, b) => (a[key] > b[key] ? 1 : -1));

    setSortedUsers(sorted);
  };

  // Filtering
  // Filtering
  const handleFilter = () => {
    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false; // Skip non-string values
      })
    );
    setSortedUsers(filteredUsers);
  };

  const handleMenuClick = (user) => {
    setSelectedUser(user.id === selectedUser ? null : user.id);
  };


  const handleEdit = (id) => {
    debugger
    // Find the user with the matching id
    const storedUsers = JSON.parse(localStorage.getItem('usersData')) ;
    const user = storedUsers.find((user) => user.id === id);
    

    // Update the state with the user data
    setUpdatedata({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      Gender: user.Gender,
      Age: user.Age,
      status: user.status
    });

    // Set the edit id
    setEditId(id);
    
  };

  // const handleDelete = (userId) => {
  //   const updatedUsers = sortedUsers.map((user) =>
  //     user.id === userId ? { ...user, status: 'Inactive' } : user
  //   );
  //   setSortedUsers(updatedUsers);
  // };

  const handleUpdate = () => {
    // Assuming you have a function like updateUser to update the user data
    const updatedUser = {
      id: editId,
      name: updatedata.name,
      username: updatedata.username,
      email: updatedata.email,
      Gender: updatedata.Gender,
      Age: updatedata.Age,
      status: updatedata.status
    };

    const updatedUsers = sortedUsers.map((user) =>
      user.id === editId ? { ...user, ...updatedUser } : user
    );

    // Set the updated user data in the state
    setSortedUsers(updatedUsers);
    console.log("updated",updatedUsers)
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));

    setEditId(-1);
    // Optionally, you can reset the updatedata state
    setUpdatedata({
      id: null,
      name: '',
      username: '',
      email: '',
      Gender: '',
      Age: '',
      status: ''
    });
  };
  
  const handleDelete = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
    const updatedUsers = sortedUsers.filter(user => user.id !== userId);
    setSortedUsers(updatedUsers);
    localStorage.setItem('usersData', JSON.stringify(updatedUsers));

  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('usersData', JSON.stringify(data));

  };
  
  const handleCheckboxChange = (userId) => {
    // Toggle the selection status of the user
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow === userId ? null : userId
    );
  };


  return (
    <div className="user-list">
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
      />
      <button className="buttonsearch" onClick={handleFilter}>Filter</button>

      <div className="new-user-modal">
        <button onClick={() => setCreateFormOpen(true)}>Add User</button>
        {isCreateFormOpen && (
          <div className="modal-content">
            <span className="close" onClick={() => setCreateFormOpen(false)}>&times;</span>
            <h3>Add New User</h3>

            <input type="text" placeholder='Name' value={newUserData.name} onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} />
            <input type="text" placeholder='Username' value={newUserData.username} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} />
            <input type="email" placeholder='Email' value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} />
            <input type="number" placeholder='Age' value={newUserData.Age} onChange={(e) => setNewUserData({ ...newUserData, Age: e.target.value })} />
            <div>
              <select
                id="gender"
                value={newUserData.Gender}
                onChange={(e) => setNewUserData({ ...newUserData, Gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

            </div>
            <div>
              <select
                id="status"
                value={newUserData.status}
                onChange={(e) => setNewUserData({ ...newUserData, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button onClick={handleAddUser}>Add User</button>
          </div>
        )}
      </div>

      <table className="custom-table">
        <thead>
          <tr>
             
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort1('name')}>Name</th>
            <th onClick={() => handleSort('username')}>Username</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('Gender')}>Gender</th>
            <th onClick={() => handleSort('Age')}>Age</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th>Action</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            user.id === editId ?
              <tr>
                
                <td className="user-id">{user.id}</td>
                <td className="user-name" ><input type="text" className="user-name" value={updatedata.name} onChange={e => setUpdatedata({ ...updatedata, name: e.target.value })} /></td>
                <td><input type="text" value={updatedata.username} onChange={e => setUpdatedata({ ...updatedata, username: e.target.value })} /></td>
                <td><input type="text" className="user-email" value={updatedata.email} onChange={e => setUpdatedata({ ...updatedata, email: e.target.value })} /></td>
                <td><input type="text" value={updatedata.Gender} onChange={e => setUpdatedata({ ...updatedata, Gender: e.target.value })} /></td>
                <td><input type="text" value={updatedata.Age} onChange={e => setUpdatedata({ ...updatedata, Age: e.target.value })} /></td>
                <td><input type="text" value={updatedata.status} onChange={e => setUpdatedata({ ...updatedata, status: e.target.value })} /></td>
                <td><button onClick={handleUpdate} style={{ "backgroundColor": "blue", "color": "white" }}>Update</button></td>
               
              </tr>
              :
              <tr key={user.id}>
                <td className="user-id">{user.id}</td>
                <td className="user-name">{user.name}</td>
                <td>{user.username}</td>
                <td className="user-email">{user.email}</td>
                <td>{user.Gender}</td>
                <td>{user.Age}</td>
                <td>{user.status}</td>
                <td>
                        <div className="menu" onClick={() => handleMenuClick(user)}>
                  &#8942; {/* Unicode for ellipsis character */}
                  {selectedRow === user.id && (
                    <div className="menu-options">
                      <button
                        className="button1"
                        onClick={() => handleEdit(user.id)}
                      >
                        Edit
                      </button>
                      <br />
                      <button
                        className="button2"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={selectedRow === user.id}
                />
              </td>
              </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedUsers.length / usersPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* <div>
      {selectedUser && (
        <UpdateForm
          updateData={updatedata}
          onSubmit={(updatedUserData) => handleFormSubmit(updatedUserData)}
        />
      )}
      </div> */}
    </div>
  );
};

export default UserList;