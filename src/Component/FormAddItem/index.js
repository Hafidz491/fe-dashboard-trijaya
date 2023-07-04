import React, { useState, useEffect } from 'react';

import './style.css';
import Modal from '../Modal';

import api from '../../Utils/ApiEndpoint';
import { useAuth } from '../../Utils/AuthContext';

function FormAddItem({
  showModalItem,
  handleShowModalItem,
  handleShowToast,
  instansiId,
}) {
  const { token } = useAuth();
  const [itemData, setItemData] = useState({
    itemName: '',
    itemVolume: '',
    itemUnit: '',
    price: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(itemData.itemVolume * itemData.price);
  }, [itemData.price, itemData.itemVolume]);

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setTotalPrice(itemData.itemVolume * itemData.price);
    const newData = {
      ...itemData,
      total: totalPrice,
      instansiId: instansiId,
    };

    try {
      let response = await api.post('project/add-item', newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleShowToast(response.data.message, 'success');
      handleShowModalItem();
      setItemData({
        itemName: '',
        itemVolume: '',
        itemUnit: '',
        price: '',
      });
    } catch (error) {
      handleShowToast(error.response.data.message, 'danger');
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  return (
    <Modal
      show={showModalItem}
      handleShowModal={handleShowModalItem}
      modalTitle={'Tambah Barang'}
    >
      <form className="form-add-user" onSubmit={handleSaveItem}>
        <div className="form-add-user mt-4">
          <div className="form-add-user">
            <div className="mb-3">
              <label htmlFor="namaBarang" className="form-label">
                Nama Barang
              </label>
              <input
                required
                value={itemData.itemName}
                onChange={handleChange}
                name="itemName"
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
                    value={itemData.itemVolume}
                    onChange={handleChange}
                    name="itemVolume"
                    type="number"
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
                    onChange={handleChange}
                    name="itemUnit"
                    required
                    value={itemData.itemUnit}
                    type="text"
                    className="form-control"
                    id="unitItme"
                    placeholder="Satuan Barang"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga Barang
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  Rp
                </span>
                <input
                  onChange={handleChange}
                  value={itemData.total}
                  required
                  name="price"
                  type="text"
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
