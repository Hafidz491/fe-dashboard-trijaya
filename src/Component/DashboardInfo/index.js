import React, { useState, useEffect } from 'react';

import { HiOutlineCurrencyDollar, HiDocumentDuplicate } from 'react-icons/hi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

import './style.css';

import api from '../../Utils/ApiEndpoint';

function DashboardInfo() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    const fetchInformation = async () => {
      const response = await api.get('/project/all/informations');
      setInformation(response.data.data);
    };

    fetchInformation();
  }, []);
  return (
    <div className="dashboard-info d-flex align-items-center justify-content-between">
      <div className="dashboard-info-item d-flex align-items-center">
        <div className="dashboard-info-item-icon item-green">
          <HiOutlineCurrencyDollar
            size={45}
            className="search-icon icon-green"
          />
        </div>
        <div className="dashboard-info-item-content ms-4">
          <span>Pendapatan</span>
          <h4>
            {information.totalIncome?.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </h4>
        </div>
      </div>
      <div className="divider"></div>
      <div className="dashboard-info-item d-flex align-items-center">
        <div className="dashboard-info-item-icon item-blue">
          <HiDocumentDuplicate size={45} className="search-icon icon-blue" />
        </div>
        <div className="dashboard-info-item-content ms-4">
          <span>Proyek Dikerjakan</span>
          <h4>{information.unfinishedProjects}</h4>
        </div>
      </div>
      <div className="divider"></div>
      <div className="dashboard-info-item d-flex align-items-center">
        <div className="dashboard-info-item-icon item-red">
          <IoCheckmarkDoneCircle size={45} className="search-icon icon-red" />
        </div>
        <div className="dashboard-info-item-content ms-4">
          <span>Proyek Selesai</span>
          <h4>{information.finishedProjects}</h4>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
