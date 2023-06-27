import React, { useEffect, useState } from 'react';

import {
  NavLink,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';

import './style.css';

import { TbDashboard, TbCircleKey } from 'react-icons/tb';
import { GoProject } from 'react-icons/go';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';

import { useAuth } from '../../Utils/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const { currentUser, logout } = useAuth();
  const [showUserAction, setShowUserAction] = useState(true);

  return (
    <div className="sidebar">
      <header className="d-flex  text-center">
        <TbDashboard size={25} color="#FF007A" />
        <h3 className="ms-1">
          Dashboard <span className="fs-7">V.01</span>
        </h3>
      </header>
      <nav>
        <NavLink to="/">
          <div
            className={
              pathname === '/'
                ? 'nav-link d-flex align-items-center justify-content-between active'
                : 'nav-link d-flex align-items-center justify-content-between'
            }
          >
            <div className="icon-font-wrapper d-flex align-items-center">
              <TbCircleKey size={20} />
              <li className="ms-4">Dashboard</li>
            </div>
            <FiChevronRight />
          </div>
        </NavLink>
        <NavLink to="/projects">
          <div
            className={
              pathname === '/projects'
                ? 'nav-link d-flex align-items-center justify-content-between active'
                : 'nav-link d-flex align-items-center justify-content-between'
            }
          >
            <div className="icon-font-wrapper d-flex align-items-center">
              <GoProject size={20} />
              <li className="ms-4">Project</li>
            </div>
            <FiChevronRight />
          </div>
        </NavLink>
        <NavLink to="/users">
          <div
            className={
              pathname === '/users'
                ? 'nav-link d-flex align-items-center justify-content-between active'
                : 'nav-link d-flex align-items-center justify-content-between'
            }
          >
            <div className="icon-font-wrapper d-flex align-items-center">
              <BiUserCircle size={20} />
              <li className="ms-4">User</li>
            </div>
            <FiChevronRight />
          </div>
        </NavLink>
      </nav>
      <div className="user-area-wrapper">
        <div
          className={
            showUserAction
              ? 'user-action align-items-center justify-content-between'
              : 'user-action display-user-action align-items-center justify-content-between'
          }
        >
          Logout
          <AiOutlineLogout className="text-danger" size={20} />
        </div>
        <div
          className="user-area d-flex align-items-center justify-content-between w-100"
          onClick={() => setShowUserAction(!showUserAction)}
        >
          <div className="user-info-wrapper d-flex align-items-center">
            <img
              src={
                'https://i.pinimg.com/originals/b1/e6/4c/b1e64c85ac76e465b277a11984e824cc.jpg'
              }
              alt=""
            />
            <div className="user-info ms-1">
              <h6 className="mb-0">{currentUser.name}</h6>
              <p className="mb-0 fs-7">{currentUser.role}</p>
            </div>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
