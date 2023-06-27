import React, { useState, useEffect } from 'react';

import './style.css';
import Main from '../Main';

import { BsTrash3 } from 'react-icons/bs';
import { Toast, ToastContainer } from 'react-bootstrap';
const { useParams } = require('react-router-dom');

import api from '../../Utils/ApiEndpoint';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import FormAddItem from '../FormAddItem';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Data Proyek Bulanan',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Proyek Dikerjakan',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Proyek Terselesaikan',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
function DetailsProject() {
  const { id } = useParams();
  const [fetchingData, setFetchingData] = useState(false);
  const [instansiData, setInstansiData] = useState({});

  useEffect(() => {
    const fetchAllItem = async () => {
      try {
        const response = await api.get('item/all');
        setListItems(response.data.data);
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
    getProjectDetail();
  }, []);

  const [showModalItem, setShowModalItem] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [thoastVariant, setThoastVariant] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  const handleShowModalItem = () => {
    setShowModalItem(!showModalItem);
  };

  const handleShowToast = (responseMessage, toastVariant) => {
    setShowToast(!showToast);
    setThoastVariant(toastVariant);
    setResponseMessage(responseMessage);
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
        <header className="detail-project-header">
          <h5>Detail Project 🔍📃</h5>
        </header>
        <div className="main-detail-project">
          <div className="row">
            <div className="col-xxl-6">
              <div className="detail-project-card">
                <div className="detail-project-card-header d-flex align-items-center justify-content-between">
                  <h5 className="fw-semibold">Project: PX-92h28s</h5>
                  <button className="btn btn-add">Edit Instansi</button>
                </div>
                <hr />
                <div className="detail-project-card-body">
                  <h6 className="fw-medium">Nama Instansi :</h6>
                  <p>{instansiData.instansiName}</p>
                  <h6 className="fw-medium">Nomor Project :</h6>
                  <p>{instansiData.projectNumber}</p>
                  <h6 className="fw-medium">Alamat :</h6>
                  <p>{instansiData.address}</p>
                  <h6 className="fw-medium">Status :</h6>
                  <p className="text-warning">
                    {instansiData.isFinished ? 'Selesai' : 'Sedang Dikerjakan'}
                  </p>
                  {/* <p className="text-success">Selesai</p> */}
                </div>
              </div>
            </div>
            <div className="col-xxl-6">
              <div className="chart-data">
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="data-item-detail-project">
            <div className="data-table">
              <header className="d-flex justify-content-between p-3">
                <h4 className="fw-bold">Data Barang</h4>
                <button className="btn btn-add" onClick={handleShowModalItem}>
                  Tambah Barang
                </button>
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
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Router RTRW NET</td>
                      <td className="">1</td>
                      <td className="fw-light">20</td>
                      <td className="fw-bold">200.000.000</td>
                      <td className="fw-bold">
                        <button className="btn btn-danger">
                          <BsTrash3 />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <FormAddItem
          handleShowModalItem={handleShowModalItem}
          showModalItem={showModalItem}
          handleShowToast={handleShowToast}
        />
      </Main>
    </div>
  );
}

export default DetailsProject;
