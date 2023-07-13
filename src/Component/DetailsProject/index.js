import React, { useState, useEffect } from 'react';

import './style.css';
import Main from '../Main';

import { BsTrash3 } from 'react-icons/bs';
import { Toast, ToastContainer } from 'react-bootstrap';
const { useParams, NavLink } = require('react-router-dom');
import { useAuth } from '../../Utils/AuthContext';

import api from '../../Utils/ApiEndpoint';
import FormAddItem from '../FormAddItem';
import FormUpdateProject from '../FormUpdateProject';

function DetailsProject() {
  const { id } = useParams();
  const { token } = useAuth();
  const [fetchingData, setFetchingData] = useState(false);
  const [instansiData, setInstansiData] = useState({});
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchAllItem = async () => {
      try {
        const response = await api.get(`project/item/${id}`);
        setListItems(response.data.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    const getProjectDetail = async () => {
      try {
        const response = await api.get(`project/${id}`);
        setInstansiData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllItem();
    getProjectDetail();
  }, [fetchingData]);

  const [showModalItem, setShowModalItem] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [thoastVariant, setThoastVariant] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');
  const [showModalUpdateProject, setShowModalUpdateProject] = useState(false);
  const [willUpdateProjectId, setWillUpdateProjectId] = useState(0);

  const handleShowModalItem = () => {
    setShowModalItem(!showModalItem);
  };

  const handleShowModalUpdateProject = (id) => {
    setShowModalUpdateProject(!showModalUpdateProject);
    setWillUpdateProjectId(id);
  };

  const handleShowToast = (responseMessage, toastVariant) => {
    setShowToast(!showToast);
    setThoastVariant(toastVariant);
    setResponseMessage(responseMessage);
    setFetchingData(!fetchingData);
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`project/delete-item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleShowToast('Data berhasil dihapus', 'success');
      setFetchingData(!fetchingData);
    } catch (error) {
      handleShowToast('Data gagal dihapus', 'danger');
    }
  };

  const handleUpdateFinishedProject = async () => {
    try {
      let response = await api.put(
        `project/update/finished/${instansiData.id}`,
        {
          isFinished: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleShowToast(response.data.message, 'success');
      setFetchingData(!fetchingData);
    } catch (error) {
      handleShowToast(error.response.data.message, 'danger');
      console.log(error);
    }
  };

  return (
    <div className="detail-project">
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
        <header className="detail-project-header d-flex align-items-center justify-content-between">
          <h5 className="d-print-none">Detail Project 🔍📃</h5>
          {!instansiData.isFinished ? (
            <div className="right-side-btn">
              <button
                className="btn btn-success me-2"
                onClick={handleUpdateFinishedProject}
              >
                Tandai Selesai
              </button>
              <NavLink
                to={`/project/print/${instansiData.id}`}
                className="btn btn-info d-print-none"
                target="_blank"
              >
                Cetak Project
              </NavLink>
            </div>
          ) : (
            <>
              {' '}
              <NavLink
                to={`/project/print/${instansiData.id}`}
                className="btn btn-info d-print-none"
              >
                Cetak Project
              </NavLink>
            </>
          )}
        </header>
        <div className="main-detail-project">
          <div className="row">
            <div className="col-xxl-6">
              <div className="detail-project-card">
                <div className="detail-project-card-header d-flex align-items-center justify-content-between">
                  <h5 className="fw-semibold">
                    Project: {instansiData.projectNumber}
                  </h5>
                  {instansiData.isFinished ? (
                    <></>
                  ) : (
                    <>
                      <button
                        className="btn btn-add"
                        onClick={() =>
                          handleShowModalUpdateProject(instansiData.id)
                        }
                      >
                        Edit Instansi
                      </button>
                    </>
                  )}
                </div>
                <hr />
                <div className="detail-project-card-body">
                  <h6 className="fw-medium">Nama Instansi :</h6>
                  <p>{instansiData.instansiName}</p>
                  <h6 className="fw-medium">Nomor Project :</h6>
                  <p>{instansiData.projectNumber}</p>
                  <h6 className="fw-medium">Berkas Dokumen :</h6>
                  <p>
                    {instansiData.document === null ? (
                      <>Belum ada dokumen</>
                    ) : (
                      <>
                        <a
                          target="_blank"
                          href={`http://localhost:5000/document/${instansiData.instansiName}/${instansiData.document}`}
                        >
                          {instansiData.document}
                        </a>
                      </>
                    )}
                  </p>
                  <h6 className="fw-medium">Alamat :</h6>
                  <p>{instansiData.address}</p>
                  <h6 className="fw-medium">Status :</h6>
                  <p
                    className={
                      instansiData.isFinished ? 'text-success' : 'text-warning'
                    }
                  >
                    {instansiData.isFinished ? 'Selesai' : 'Sedang Dikerjakan'}
                  </p>
                  {/* <p className="text-success">Selesai</p> */}
                </div>
              </div>
            </div>
            <div className="col-xxl-6"></div>
          </div>
          <div className="data-item-detail-project">
            <div className="data-table">
              <header className="d-flex justify-content-between p-3">
                <h4 className="fw-bold">Data Barang</h4>
                {instansiData.isFinished ? (
                  <></>
                ) : (
                  <>
                    <button
                      className="btn btn-add"
                      onClick={handleShowModalItem}
                    >
                      Tambah Barang
                    </button>
                  </>
                )}
              </header>
              <div className="table-wrapper p-3">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama Barang</th>
                      <th scope="col">Volume</th>
                      <th scope="col">Satuan</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Total</th>
                      {instansiData.isFinished ? (
                        <></>
                      ) : (
                        <>
                          <th scope="col">Aksi</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {listItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.itemName}</td>
                        <td className="">{item.itemVolume}</td>
                        <td className="fw-light">{item.itemUnit}</td>
                        <td className="fw-bold">
                          {item.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </td>
                        <td>
                          {item.total.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </td>
                        <td className="fw-bold">
                          {instansiData.isFinished ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <BsTrash3 />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                  <tfoot className="tfoot">
                    <tr>
                      <th id="total" className="fw-bold" colspan="5">
                        Total :
                      </th>
                      <td className="fw-bold">
                        {parseInt(instansiData.totalPrice, 10).toLocaleString(
                          'id-ID',
                          {
                            style: 'currency',
                            currency: 'IDR',
                          }
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <FormAddItem
          instansiId={id}
          handleShowModalItem={handleShowModalItem}
          showModalItem={showModalItem}
          handleShowToast={handleShowToast}
        />
        <FormUpdateProject
          handleShowModalUpdateProject={handleShowModalUpdateProject}
          showModalUpdateProject={showModalUpdateProject}
          willUpdateProjectId={willUpdateProjectId}
          handleShowToast={handleShowToast}
        />
      </Main>
    </div>
  );
}

export default DetailsProject;
