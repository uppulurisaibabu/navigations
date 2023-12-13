// UserList.js
import React, { useState, useEffect } from 'react';
import './UserList.css'; // Import custom CSS

const UserList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedUsers, setSortedUsers] = useState(users);

  useEffect(() => {
    setSortedUsers(users);
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
  return (
    <div className="user-list">
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
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
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.Gender}</td>
              <td>{user.Age}</td>
              <td>{user.status}</td>
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
    </div>
  );
};

export default UserList;
