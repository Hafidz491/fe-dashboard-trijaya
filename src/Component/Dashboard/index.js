import React from 'react';
import Main from '../Main';
import DashboardInfo from '../DashboardInfo';
import DataChart from '../DataChart';

import { FiSearch } from 'react-icons/fi';

import './style.css';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
  return (
    <div className="dashboard">
      <Main>
        <div className="main-dashboard">
          <div className="header-dashboard d-flex align-items-center justify-content-between">
            <h5>Hello, Jihan👋🏼,</h5>
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
                <h4 className='fw-bold'>Project Dikerjakan</h4>
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
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>RSUD Muhammadiyah Kab. Blora</td>
                      <td className='fw-bold'>Rp.12.500.000,00</td>
                      <td className='fw-light'>15, Juni 2023</td>
                    </tr>
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
