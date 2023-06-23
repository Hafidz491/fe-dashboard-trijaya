import React from 'react';

import './style.css';
import Sidebar from '../../Component/Sidebar';
import ManageUser from '../../Component/ManageUser';

function UsersPage() {
  return (
    <>
      <Sidebar />
      <ManageUser />
    </>
  );
}

export default UsersPage;
