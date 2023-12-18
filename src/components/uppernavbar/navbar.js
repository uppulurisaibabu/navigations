import React, { useState } from 'react';
import './nav.css'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.png';
import icon from './image-icon.jpg'


const Navbar = () => {
  
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const handleLogout = () => {
      // Perform logout logic here
      alert('Logout clicked');
    };
  
    return (
      <header className="header">
        <img src={Logo} className="img" alt="logo" />
        <div className='pf'>
        <div className="profile" onClick={toggleDropdown}>
        
          <img src={icon} alt="Profile Icon" className="profile-icon" />
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
        </div>
      </header>
    );
  };


export default Navbar;
