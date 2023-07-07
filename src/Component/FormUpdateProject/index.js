import React, { useState, useEffect } from 'react';

import './style.css';

import Modal from '../Modal';

import api from '../../Utils/ApiEndpoint';

import { useAuth } from '../../Utils/AuthContext';

function FormUpdateProject({
  showModalUpdateProject,
  handleShowModalUpdateProject,
  willUpdateProjectId,
  handleShowToast,
}) {
  const { token } = useAuth();
  const [instansiData, setInstansiData] = useState({
    instansiName: '',
    projectNumber: '',
    address: '',
  });
  const [document, setDocument] = useState(undefined);

  useEffect(() => {
    if (showModalUpdateProject) {
      const fetchData = async () => {
        const response = await api.get(`/project/${willUpdateProjectId}`);
        let popPrefixProjectNumber = response.data.data.projectNumber
          .split('PX-')
          .pop();
        setInstansiData({
          instansiName: response.data.data.instansiName,
          projectNumber: popPrefixProjectNumber,
          address: response.data.data.address,
        });
      };

      fetchData();
    }
  }, [showModalUpdateProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstansiData({
      ...instansiData,
      [name]: value,
    });
  };

  const handleDocumentFile = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleUpdateInstansi = async (e) => {
    e.preventDefault();
    if (document !== undefined) {
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
          `project/update/${willUpdateProjectId}`,
          newInstansiData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        handleShowModalUpdateProject();
        handleShowToast(response.data.message, 'success');
        setInstansiData({
          instansiName: '',
          projectNumber: '',
          address: '',
        });
      } catch (error) {
        handleShowToast(error.response.data.message, 'danger');
      }
    } else {
      try {
        const response = await api.put(
          `project/update/${willUpdateProjectId}`,
          {
            instansiName: instansiData.instansiName,
            projectNumber: `PX-${instansiData.projectNumber}`,
            address: instansiData.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleShowModalUpdateProject();
        handleShowToast(response.data.message, 'success');
        setInstansiData({
          instansiName: '',
          projectNumber: '',
          address: '',
        });
      } catch (error) {
        console.log(error);
        handleShowToast(error.response.data.message, 'danger');
      }
    }
  };

  return (
    <Modal
      show={showModalUpdateProject}
      handleShowModal={handleShowModalUpdateProject}
      modalTitle={'Edit Instasi'}
    >
      <div className="form-instansi mt-3">
        <h5>Form Edit Instansi</h5>
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
          <button
            className="btn btn-add w-100"
            type="submit"
            onClick={handleUpdateInstansi}
          >
            Simpan Update Instansi
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FormUpdateProject;
