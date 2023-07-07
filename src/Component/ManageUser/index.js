import { React, useState, useEffect } from 'react';
import './style.css';
import Main from '../Main';
import FormAddUser from '../FormAddUser';

import api from '../../Utils/ApiEndpoint';

import { FiSearch } from 'react-icons/fi';
import { TbEditCircle } from 'react-icons/tb';
import { BsTrash3 } from 'react-icons/bs';
import { Toast, ToastContainer } from 'react-bootstrap';

function ManageUser() {
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [thoastVariant, setThoastVariant] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const [fethingData, setFetchingData] = useState(false);
  const [willUpdateUser, setWillUpdateUser] = useState(false);
  const [willUpdateUserId, setWillUpdateUserId] = useState(0);

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetchingData(true);
        const response = await api.get('user/all');
        setListUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [fethingData]);

  const handleShowModalAddUser = () => {
    setShowModalAddUser(!showModalAddUser);
    setWillUpdateUser(false)
  };

  const handleShowToast = (responseMessage, toastVariant) => {
    setShowToast(!showToast);
    setThoastVariant(toastVariant);
    setResponseMessage(responseMessage);
    setFetchingData(!fethingData);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await api.delete(`user/delete/${id}`);
      handleShowToast(response.data.message, 'success');
      setFetchingData(!fethingData);
    } catch (error) {
      handleShowToast(error.response.data.message, 'danger');
    }
  };

  const handleEditUser = (id) => {
    setWillUpdateUser(true);
    setShowModalAddUser(!showModalAddUser);
    setWillUpdateUserId(id);
  };

  return (
    <div className="manage-user">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          bg={thoastVariant}
          className="text-white"
          show={showToast}
          delay={3000}
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <strong className="me-auto">Notifikasi</strong>
          </Toast.Header>
          <Toast.Body>{responseMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
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
                  {listUser.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td className="fw-bold">{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-add me-3"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <TbEditCircle size={20} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <BsTrash3 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FormAddUser
          setWillUpdateUser={setWillUpdateUser}
          willUpdateUser={willUpdateUser}
          willUpdateUserId={willUpdateUserId}
          handleShowToast={handleShowToast}
          showModalAddUser={showModalAddUser}
          handleShowModalAddUser={handleShowModalAddUser}
        />
      </Main>
    </div>
  );
}

export default ManageUser;
