import React, { useState, useEffect } from 'react';

import Modal from '../Modal';
import './style.css';

import api from '../../Utils/ApiEndpoint';

function FormAddUser({
  showModalAddUser,
  handleShowModalAddUser,
  handleShowToast,
  willUpdateUserId,
  willUpdateUser,
  setWillUpdateUser,
}) {
  const [newUserInformation, setNewUserInformation] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedRole, setSelectedRole] = useState('Staff');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (willUpdateUser) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`user/detail/${willUpdateUserId}`);
          const { name, email, role } = response.data.data;
          setNewUserInformation({
            name,
            email,
            role,
            password: '',
            confirmPassword: '',
          });
          setSelectedRole(role);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    } else {
      resetForm();
    }
  }, [willUpdateUser]);

  const resetForm = () => {
    setNewUserInformation({
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    setIsError(false);

    if (!willUpdateUser) {
      try {
        if (
          newUserInformation.password !== newUserInformation.confirmPassword
        ) {
          setIsError(true);
          return;
        }

        const newData = {
          ...newUserInformation,
          role: selectedRole,
        };

        let response = await api.post('user/register', newData);
        handleShowToast(response.data.message, 'success');
        handleShowModalAddUser();
        resetForm();
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
      }
    } else {
      try {
        if (
          newUserInformation.password !== newUserInformation.confirmPassword
        ) {
          setIsError(true);
          return;
        }

        const newData = {
          ...newUserInformation,
          role: selectedRole,
        };

        let response = await api.put(
          `user/update/${willUpdateUserId}`,
          newData
        );
        handleShowToast(response.data.message, 'success');
        handleShowModalAddUser();
        resetForm();
        setWillUpdateUser(false);
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInformation({
      ...newUserInformation,
      [name]: value,
    });
  };

  return (
    <Modal
      show={showModalAddUser}
      handleShowModal={handleShowModalAddUser}
      modalTitle={willUpdateUser ? 'Update User' : 'Tambah User'}
    >
      <form className="form-add-user" onSubmit={addUser}>
        <div className="form-add-user mt-4">
          <div className="form-add-user">
            <div className="mb-3">
              <label htmlFor="namaUser" className="form-label">
                Nama User
              </label>
              <input
                required
                name="name"
                value={newUserInformation.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="namaUser"
                placeholder="Nama User"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailUser" className="form-label">
                Email User
              </label>
              <input
                required
                name="email"
                value={newUserInformation.email}
                onChange={handleChange}
                type="email"
                className="form-control"
                id="emailUser"
                placeholder="Email User"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roleUser" className="form-label">
                Role User
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="passwordUser" className="form-label">
                Passoword User
              </label>
              <input
                required
                name="password"
                value={newUserInformation.password}
                onChange={handleChange}
                type="password"
                className="form-control"
                id="passwordUser"
                placeholder="Password User"
              />
            </div>
            <div className={isError ? 'mb-2' : 'mb-3'}>
              <label htmlFor="konfirmasiPasswordUser" className="form-label">
                Konfirmasi Password User
              </label>
              <input
                required
                name="confirmPassword"
                value={newUserInformation.confirmPassword}
                onChange={handleChange}
                type="password"
                className="form-control"
                id="konfirmasiPasswordUser"
                placeholder="Password User"
              />
            </div>
            {isError && (
              <div className="alert-section mb-3">
                <h6 className="text-danger">Konfirmasi password tidak sama</h6>
              </div>
            )}
            <div className="mb-3">
              <button className="btn btn-add w-100">
                {willUpdateUser ? 'Update User' : 'Tambah User'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default FormAddUser;
