import { React, useState, useEffect } from 'react';

import Modal from '../Modal';

import api from '../../Utils/ApiEndpoint';
import { useAuth } from '../../Utils/AuthContext';

import { BsTrash3 } from 'react-icons/bs';

function FormAddProject({
  showModalProject,
  handleShowModalProject,
  handleShowToast,
  fetchingDataFromParentPage,
  valueFetchingDataFromParentPage,
}) {
  const { token } = useAuth();
  const [isInstansiSaved, setIsInstansiSaved] = useState(false);
  const [instansiWillUpdate, setInstansiWillUpdate] = useState(false);
  const [willAddItem, setWillAddItem] = useState(false);
  const [document, setDocument] = useState();
  const [instansiId, setInstansiId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [listItem, setListItem] = useState([]);
  const [fethingData, setFetchingData] = useState(false);
  const [instansiData, setInstansiData] = useState({
    instansiName: '',
    projectNumber: '',
    address: '',
  });
  const [itemData, setItemData] = useState({
    itemName: '',
    itemVolume: '',
    itemUnit: '',
    price: '',
  });

  useEffect(() => {
    setTotalPrice(itemData.itemVolume * itemData.price);
  }, [itemData.price, itemData.itemVolume]);

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        let response = await api.get(`project/item/${instansiId}`);
        setListItem(response.data.data.items);
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
        console.log(error.response);
      }
    };
    if (isInstansiSaved) {
      fetchListItems();
    }
  }, [fethingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstansiData({
      ...instansiData,
      [name]: value,
    });
  };

  const handleChangeItemData = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleDocumentFile = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSaveInstansi = async (e) => {
    e.preventDefault();
    if (!instansiWillUpdate) {
      try {
        let newInstansiData = new FormData();
        newInstansiData.append('instansiName', instansiData.instansiName);
        newInstansiData.append(
          'projectNumber',
          `PX-${instansiData.projectNumber}`
        );
        newInstansiData.append('address', instansiData.address);
        newInstansiData.append('document', document);
        let response = await api.post('project/add', newInstansiData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        handleShowToast(response.data.message, 'success');
        setInstansiId(response.data.data.id);
        setIsInstansiSaved(true);
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
      }
    } else {
      try {
        let newInstansiData = new FormData();
        newInstansiData.append('instansiName', instansiData.instansiName);
        newInstansiData.append(
          'projectNumber',
          `PX-${instansiData.projectNumber}`
        );
        newInstansiData.append('address', instansiData.address);
        newInstansiData.append('document', document);
        let response = await api.put(
          `project/update/${instansiId}`,
          newInstansiData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        handleShowToast(response.data.message, 'success');
        setIsInstansiSaved(true);
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
      }
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setTotalPrice(itemData.itemVolume * itemData.price);
    const newData = {
      ...itemData,
      total: totalPrice,
      instansiId,
    };

    try {
      let response = await api.post('project/add-item', newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleShowToast(response.data.message, 'success');
      setItemData({
        itemName: '',
        itemVolume: '',
        itemUnit: '',
        price: '',
      });
      setFetchingData(!fethingData);
    } catch (error) {
      handleShowToast(error.response.data.message, 'danger');
      console.log(error.response);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      let response = await api.delete(`project/delete-item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchingData(!fethingData);
      handleShowToast(response.data.message, 'success');
    } catch (error) {
      handleShowToast(error.response.data.message, 'danger');
      console.log(error.response);
    }
  };

  const handleInstansiWillUpdate = () => {
    setInstansiWillUpdate(true);
    setIsInstansiSaved(false);
  };

  const handleSubmit = async (e) => {
    handleShowModalProject();
    setInstansiData({
      instansiName: '',
      projectNumber: '',
      address: '',
    });
    setIsInstansiSaved(false);
    setInstansiWillUpdate(false);
    setWillAddItem(false);
    fetchingDataFromParentPage(!valueFetchingDataFromParentPage);
  };

  return (
    <Modal
      show={showModalProject}
      handleShowModal={handleShowModalProject}
      modalTitle={'Tambah Project'}
    >
      <div className="form-add-product mt-4">
        {/* <form> */}
        {isInstansiSaved ? (
          <div className="form-instansi">
            <h5>Form Instansi</h5>
            <div className="mb-3">
              <label htmlFor="namaInstansi" className="form-label">
                Nama Instansi
              </label>
              <input
                disabled
                value={instansiData.instansiName}
                onChange={handleChange}
                name="instansiName"
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
                  disabled
                  value={instansiData.projectNumber}
                  onChange={handleChange}
                  name="projectNumber"
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
              <input
                disabled
                onChange={handleDocumentFile}
                className="form-control"
                type="file"
                id="formFile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Alamat
              </label>
              <textarea
                disabled
                value={instansiData.address}
                onChange={handleChange}
                name="address"
                className="form-control"
                id="address"
                rows="3"
              ></textarea>
            </div>
            <div className="button-save-instansi-wrapper row">
              {isInstansiSaved ? (
                <>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-success w-100"
                        type="button"
                        onClick={handleInstansiWillUpdate}
                      >
                        Edit Instansi
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-primary  w-100"
                        type="button"
                        onClick={() => setWillAddItem(!willAddItem)}
                      >
                        Tambah Barang
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-add w-100"
                    type="submit"
                    onClick={handleSaveInstansi}
                  >
                    Simpan Instansi
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="form-instansi">
            <h5>Form Instansi</h5>
            <div className="mb-3">
              <label htmlFor="namaInstansi" className="form-label">
                Nama Instansi
              </label>
              <input
                value={instansiData.instansiName}
                onChange={handleChange}
                name="instansiName"
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
                  value={instansiData.projectNumber}
                  onChange={handleChange}
                  name="projectNumber"
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
              <input
                onChange={handleDocumentFile}
                className="form-control"
                type="file"
                id="formFile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Alamat
              </label>
              <textarea
                value={instansiData.address}
                onChange={handleChange}
                name="address"
                className="form-control"
                id="address"
                rows="3"
              ></textarea>
            </div>
            <div className="button-save-instansi-wrapper row">
              {isInstansiSaved ? (
                <>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-success w-100"
                        type="button"
                        onClick={handleInstansiWillUpdate}
                      >
                        Edit Instansi
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-success w-100"
                        type="button"
                        onClick={handleInstansiWillUpdate}
                      >
                        Edit Instansi
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-add w-100"
                    type="submit"
                    onClick={handleSaveInstansi}
                  >
                    Simpan Instansi
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {/* </form> */}
        {willAddItem ? (
          <>
            <hr />
            <div className="form-barang">
              <div className="form-barang-header d-flex align-items-center justify-content-between">
                <h5>Masukan Barang</h5>
                <button className="btn btn-add" onClick={handleSaveItem}>
                  Tambahkan Barang
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  onChange={handleChangeItemData}
                  name="itemName"
                  value={itemData.itemName}
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
                    onChange={handleChangeItemData}
                    name="itemVolume"
                    value={itemData.itemVolume}
                    type="number"
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
                    onChange={handleChangeItemData}
                    name="itemUnit"
                    value={itemData.itemUnit}
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
                    onChange={handleChangeItemData}
                    name="price"
                    value={itemData.price}
                    type="number"
                    className="form-control"
                    id="harga"
                    placeholder="Harga Barang"
                  />
                  <span className="input-group-text" id="basic-addon1">
                    Jumlah:{' '}
                    {totalPrice.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <> </>
        )}
        {willAddItem ? (
          <>
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
                    {listItem.map((item, index) => (
                      <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.itemVolume}</td>
                        <td>{item.itemUnit}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <BsTrash3 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <> </>
        )}
        <hr />
        <button
          type="submit"
          className="btn btn-add w-100"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}

export default FormAddProject;
