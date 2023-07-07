import React, { useState, useEffect } from 'react';
import Main from '../Main';
import DashboardInfo from '../DashboardInfo';
import DataChart from '../DataChart';

import api from '../../Utils/ApiEndpoint';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

import './style.css';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FiSearch } from 'react-icons/fi';

import { useAuth } from '../../Utils/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Langganan', 'Non-Langganan', 'Paket'],
  datasets: [
    {
      label: 'Customers',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/project/all/false');
      setProjects(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Main>
        <div className="main-dashboard">
          <div className="header-dashboard d-flex align-items-center justify-content-between">
            <h5>Hello, {currentUser.name}👋🏼,</h5>
            <div className="search-bar bg-white d-flex align-items-center">
              <FiSearch />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="dashboard-content">
            <DashboardInfo />
            <div className="data-information-wrapper row">
              <div className="col-8">
                <DataChart />
              </div>
              <div className="col-4">
                <div className="chart-data">
                  <Pie data={data} />
                </div>
              </div>
            </div>
            <div className="data-table mb-4">
              <header className="d-flex justify-content-between p-3">
                <h4 className="fw-bold">Project Dikerjakan</h4>
                <div className="search-bar bg-body d-flex align-items-center">
                  <FiSearch />
                  <input type="text" placeholder="Search" />
                </div>
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
                    {projects.map((project, index) => (
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
      </Main>
    </div>
  );
}

export default Dashboard;
