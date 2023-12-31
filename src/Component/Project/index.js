import React, { useState, useEffect } from 'react';
import Main from '../Main';
import FormAddProject from '../FormAddProject';
import DataChartProject from '../DataCharProject';
import { ToastContainer, Toast } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './style.css';

import api from '../../Utils/ApiEndpoint';

function Project() {
  const [projectsWithStatusFalse, setProjectsWithStatusFalse] = useState([]);
  const [projectWithStatusTrue, setProjectWithStatusTrue] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  useEffect(() => {
    const getProjectsWithFalseStatus = async () => {
      const response = await api.get('/project/all/false');
      setProjectsWithStatusFalse(response.data.data);
    };

    const getProjectsWithTrueStatus = async () => {
      const response = await api.get('/project/all/true');
      setProjectWithStatusTrue(response.data.data);
    };

    getProjectsWithFalseStatus();
    getProjectsWithTrueStatus();
  }, [fetchingData]);
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
              <DataChartProject />
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
                      {projectsWithStatusFalse.map((project, index) => (
                        <tr key={index}>
                          <td>
                            <NavLink to={`/project/${project.id}`}>
                              {index + 1}
                            </NavLink>
                          </td>
                          <td>
                            <NavLink to={`/project/${project.id}`}>
                              {project.instansiName}
                            </NavLink>
                          </td>
                          <td className="fw-bold">
                            <NavLink to={`/project/${project.id}`}>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(project.totalPrice)}
                            </NavLink>
                          </td>
                          <td className="fw-light">
                            <NavLink to={`/project/${project.id}`}>
                              {new Date(project.createdAt).toLocaleDateString(
                                'id-ID',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </NavLink>
                          </td>
                        </tr>
                      ))}
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
                      {projectWithStatusTrue.map((project, index) => (
                        <tr key={index}>
                          <td>
                            <NavLink to={`/project/${project.id}`}>
                              {index + 1}
                            </NavLink>
                          </td>
                          <td>
                            <NavLink to={`/project/${project.id}`}>
                              {project.instansiName}
                            </NavLink>
                          </td>
                          <td className="fw-bold">
                            <NavLink to={`/project/${project.id}`}>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(project.totalPrice)}
                            </NavLink>
                          </td>
                          <td className="fw-light">
                            <NavLink to={`/project/${project.id}`}>
                              {new Date(project.createdAt).toLocaleDateString(
                                'id-ID',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </NavLink>
                          </td>
                        </tr>
                      ))}
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
          fetchingDataFromParentPage={setFetchingData}
          valueFetchingDataFromParentPage={fetchingData}
        />
      </Main>
    </div>
  );
}

export default Project;
