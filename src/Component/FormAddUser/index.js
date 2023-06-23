import React from 'react';

import Modal from '../Modal';

import './style.css';

function FormAddUser({ showModalAddUser, handleShowModalAddUser }) {
  return (
    <Modal
      show={showModalAddUser}
      handleShowModal={handleShowModalAddUser}
      modalTitle={'Tambah User'}
    >
      <div className="form-add-user mt-4">
        <div className="form-add-user">
          <div className="mb-3">
            <label htmlFor="namaUser" className="form-label">
              Nama User
            </label>
            <input
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
              type="email"
              className="form-control"
              id="emailUser"
              placeholder="Email User"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordUser" className="form-label">
              Passoword User
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordUser"
              placeholder="Password User"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="konfirmasiPasswordUser" className="form-label">
              Konfirmasi Password User
            </label>
            <input
              type="password"
              className="form-control"
              id="konfirmasiPasswordUser"
              placeholder="Password User"
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-add w-100">Tambah User</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FormAddUser;
