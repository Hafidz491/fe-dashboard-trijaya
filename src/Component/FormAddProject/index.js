import { React, useState } from 'react';

import Modal from '../Modal';

import { BsTrash3 } from 'react-icons/bs';

function FormAddProject({ showModalProject, handleShowModalProject }) {
  const [isInstansiSaved, setIsInstansiSaved] = useState(true);

  return (
    <Modal
      show={showModalProject}
      handleShowModal={handleShowModalProject}
      modalTitle={'Tambah Project'}
    >
      <div className="form-add-product mt-4">
        <div className="form-instansi">
          <h5>Form Instansi</h5>
          <div className="mb-3">
            <label htmlFor="namaInstansi" className="form-label">
              Nama Instansi
            </label>
            <input
              type="text"
              className="form-control"
              id="namaInstansi"
              placeholder="Nama Instansi"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nomorProject" className="form-label">
              Nomor Project
            </label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                PX-
              </span>
              <input
                type="text"
                className="form-control"
                id="nomorProject"
                placeholder="Nomor Project"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="dokumen" className="form-label">
              Dokumen
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Alamat
            </label>
            <textarea className="form-control" id="address" rows="3"></textarea>
          </div>
          <div className="button-save-instansi-wrapper">
            {isInstansiSaved ? (
              <>
                <button className="btn btn-success w-100" type="button">
                  Edit Instansi
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-add w-100" type="button">
                  Simpan Instansi
                </button>
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="form-barang">
          <div className="form-barang-header d-flex align-items-center justify-content-between">
            <h5>Masukan Barang</h5>
            <button className="btn btn-add">Tambah Barang</button>
          </div>
          <div className="mb-3">
            <label htmlFor="namaBarang" className="form-label">
              Nama Barang
            </label>
            <input
              type="text"
              className="form-control"
              id="namaBarang"
              placeholder="Nama Barang"
            />
          </div>
          <div className="mb-3 row">
            <div className="col-6">
              <label htmlFor="volume" className="form-label">
                Volume Barang
              </label>
              <input
                type="text"
                className="form-control"
                id="volume"
                placeholder="Volume Barang"
              />
            </div>
            <div className="col-6">
              <label htmlFor="satuan" className="form-label">
                Satuan
              </label>
              <input
                type="text"
                className="form-control"
                id="satuan"
                placeholder="Satuan"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="harga" className="form-label">
              Harga Barang
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="harga"
                placeholder="Harga Barang"
              />
              <span className="input-group-text" id="basic-addon1">
                Jumlah: Rp12.000.000
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="preview-barang">
          <h5>Preview Barang</h5>
          <div className="table-wrapper p-3">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Satuan</th>
                  <th scope="col">Harga Satuan</th>
                  <th scope="col">Jumlah Harga</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Beras Multidimensi</td>
                  <td>2</td>
                  <td>10</td>
                  <td>Rp12.000</td>
                  <td>Rp12.000.000</td>
                  <td>
                    <button className="btn btn-danger">
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Beras Multidimensi</td>
                  <td>2</td>
                  <td>10</td>
                  <td>Rp12.000</td>
                  <td>Rp12.000.000</td>
                  <td>
                    <button className="btn btn-danger">
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <button type="submit" className="btn btn-add w-100">
          Submit
        </button>
      </div>
    </Modal>
  );
}

export default FormAddProject;
