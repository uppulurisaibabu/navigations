import React, { useState } from 'react';
import './nav.css'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  return (
    <div>
    
    {/* <img className="img" src='https://www.titanisu.com/images/logo.png' /> */}
    <div className="alighn">
      
    <img className="img" src='https://www.titanisu.com/images/logo.png' alt="jsjsj" />
    <div className="user-account" onClick={toggleDropdown} onBlur={closeDropdown} tabIndex="0">
      <FontAwesomeIcon icon={faUser} />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>Profile Settings</li>
            <li>Logout</li>
            <li>Edit Profile Details</li>
          </ul>
        </div>
      )}
    </div>
    
   
    </div>
  </div>

  )
}

export default Navbar
