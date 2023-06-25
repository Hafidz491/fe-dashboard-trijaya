import React, { useState } from 'react';
import Main from '../Main';
import FormAddProject from '../FormAddProject';
import { ToastContainer, Toast } from 'react-bootstrap';
import './style.css';

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

function Project() {
  const [showModalProject, setShowModalProject] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [thoastVariant, setThoastVariant] = useState('success');

  const handleShowModalProject = () => {
    setShowModalProject(!showModalProject);
  };

  const handleShowToast = (responseMessage, toastVariant) => {
    setShowToast(!showToast);
    setThoastVariant(toastVariant);
    setResponseMessage(responseMessage);
  };

  return (
    <div className="project">
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
          <h5>Project 📃</h5>
          <div className="add-project-button-wrapper">
            <button onClick={handleShowModalProject} className="btn btn-add">
              Tambah Project
            </button>
          </div>
        </div>
        <div className="project-content">
          <div className="chart-project">
            <div className="chart-data">
              <Line data={data} options={options} />
            </div>
          </div>
          <div className="detail-project row mb-4">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 col-xl-12 col-xxl-6">
              <div className="data-table">
                <header className="d-flex justify-content-between p-3">
                  <h4 className="fw-bold">Project Dikerjakan</h4>
                </header>
                <div className="table-wrapper p-3">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Instansi</th>
                        <th scope="col">Nilai</th>
                        <th scope="col">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="">1</a>
                        </td>
                        <td>
                          <a href="">RSUD Muhammadiyah Kab. Blora</a>
                        </td>
                        <td className="fw-bold">
                          <a href="">Rp.12.500.000,00</a>
                        </td>
                        <td className="fw-light">
                          <a href="">15, Juni 2023</a>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 col-xl-12 col-xxl-6 mb-4">
              <div className="data-table">
                <header className="d-flex justify-content-between p-3">
                  <h4 className="fw-bold">Project Terselesaikan</h4>
                </header>
                <div className="table-wrapper p-3">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Instansi</th>
                        <th scope="col">Nilai</th>
                        <th scope="col">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>RSUD Muhammadiyah Kab. Blora</td>
                        <td className="fw-bold">Rp.12.500.000,00</td>
                        <td className="fw-light">15, Juni 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FormAddProject
          handleShowToast={handleShowToast}
          handleShowModalProject={handleShowModalProject}
          showModalProject={showModalProject}
        />
      </Main>
    </div>
  );
}

export default Project;
