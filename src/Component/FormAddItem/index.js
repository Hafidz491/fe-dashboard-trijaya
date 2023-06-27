import React from 'react';

import './style.css';
import Modal from '../Modal';

function FormAddItem({ showModalItem, handleShowModalItem, handleShowToast }) {
  return (
    <Modal
      show={showModalItem}
      handleShowModal={handleShowModalItem}
      modalTitle={'Tambah Barang'}
    >
      <form className="form-add-user">
        <div className="form-add-user mt-4">
          <div className="form-add-user">
            <div className="mb-3">
              <label htmlFor="namaBarang" className="form-label">
                Nama Barang
              </label>
              <input
                required
                name="name"
                type="text"
                className="form-control"
                id="namaBarang"
                placeholder="Nama Barang"
              />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="itemVolume" className="form-label">
                    Volume Barang
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="form-control"
                    id="itemVolume"
                    placeholder="Volume Barang"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="unitItme" className="form-label">
                    Satuan Barang
                  </label>
                  <input
                    required
                    name="password"
                    type="password"
                    className="form-control"
                    id="unitItme"
                    placeholder="Satuan Barang"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="itemPrice" className="form-label">
                Harga Barang
              </label>
              <input
                required
                name="confirmPassword"
                type="password"
                className="form-control"
                id="itemPrice"
                placeholder="Harga Barang"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-add w-100">Tambah Barang</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default FormAddItem;
