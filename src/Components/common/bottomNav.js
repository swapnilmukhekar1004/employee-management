import React from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io"
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const Navigation = [
    { path: "/", icon: <AiOutlineDashboard /> },
  
    { path: "/Create-Employee", icon: <IoMdAdd /> }
  ];

  return (

      <div className='bottomNavWrapper'>
        <ul>
          {Navigation.map(navItem => (
            <li key={navItem.path} className={location.pathname === navItem.path ? 'activePage' : 'unActive'}>
              <Link to={navItem.path}>{navItem.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
   
  );
}

