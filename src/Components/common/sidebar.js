
import React from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { FaList } from "react-icons/fa";

import { IoMdAdd } from "react-icons/io"
import { Link, useLocation } from 'react-router-dom';


export default function Sidebar() {
  const location = useLocation();

  const Navigation = [
    { path: "/", icon: <AiOutlineDashboard /> },
    { path: "/Employee-Details", icon: <FaList /> },
    { path: "/Create-Employee", icon: <IoMdAdd /> }
  ];

  return (
    <aside>
      <div className='NavigationWrapper'>
        <ul>
          {Navigation.map(navItem => (
            <li key={navItem.path} className={location.pathname === navItem.path ? 'activePage' : 'unActive'}>
              <Link to={navItem.path}>{navItem.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    


    </aside>
  );
}

