import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Task1 from './components/todo/todo';
import Task2 from './components/uppernavbar/navbar';
import Accodian from './components/accodian/accodian';
import Bmi from './components/bmicalculator/bmi';
import Userlist from './components/alluserlist/alluserlist' ;
import usersData from './userlistcomponent/uselist';

import './App.css'

const App = () => {
  return (
   
      <Router>
        
       
        <Task2 />
      
      <div className="d-flex bg-light p-3 ">
        <div className="bg-black p-4" style={{ width: '300px' }}>
          
          <ul className="list-unstyled ">
            <li>
              <Link to="/task1" className="text-decoration-none text-blue  ">Todo task</Link>
            </li>
            <li>
              <Link to="/accodian" className="text-decoration-none text-blue">Accordion component task</Link>
            </li>
            <li>
              <Link to="/bmi" className="text-decoration-none text-blue">Bmi Calculator task</Link>
            </li>
            <li>
              <Link to="/userslist" className="text-decoration-none text-blue">Users List Component</Link>
            </li>
            
           
            
          </ul>
        </div>
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/task1" element={<Task1 />} />
            {/* <Route path="/task2" element={<Task2 />} /> */}
            <Route path="/accodian" element={<Accodian />} />
            <Route path="/bmi" element={<Bmi />} />
            <Route path="/userslist" element={<Userlist  users={usersData}/>} />
           
          </Routes>
        </div>
      </div>
      
      
    </Router>
  );
};
export default App;
