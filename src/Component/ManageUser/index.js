import { React, useState } from 'react';
import Main from '../Main';
import FormAddUser from '../FormAddUser';

import './style.css';

import { FiSearch } from 'react-icons/fi';
import { TbEditCircle } from 'react-icons/tb';
import { BsTrash3 } from 'react-icons/bs';

function ManageUser() {
  const [showModalAddUser, setShowModalAddUser] = useState(false);

  const handleShowModalAddUser = () => {
    setShowModalAddUser(!showModalAddUser);
  };

  return (
    <div className="manage-user">
      <Main>
        <div className="header-dashboard d-flex align-items-center justify-content-between">
          <h5>Manage User 👥</h5>
          <div className="add-user-wrapper">
            <button
              type="button"
              className="btn btn-add"
              onClick={handleShowModalAddUser}
            >
              Tambah User
            </button>
          </div>
        </div>
        <div className="content-manage-user">
          <div className="data-table">
            <header className="d-flex justify-content-between p-3">
              <h4 className="fw-bold">List User</h4>
              <div className="search-bar bg-body d-flex align-items-center">
                <FiSearch />
                <input type="text" placeholder="Search" />
              </div>
            </header>
            <div className="table-wrapper p-3">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="">1</a>
                    </td>
                    <td>
                      <a href="">Barry ALlen</a>
                    </td>
                    <td className="fw-bold">
                      <a href="">barryallen@gmail.com</a>
                    </td>
                    <td>Admin</td>
                    <td>
                      <button type="button" className="btn btn-add me-3">
                        <TbEditCircle size={20} />
                      </button>
                      <button type="button" className="btn btn-danger">
                        <BsTrash3 size={20} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FormAddUser
          showModalAddUser={showModalAddUser}
          handleShowModalAddUser={handleShowModalAddUser}
        />
      </Main>
    </div>
  );
}

export default ManageUser;
