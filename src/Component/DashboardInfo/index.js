import React from 'react';

import { HiOutlineCurrencyDollar, HiDocumentDuplicate } from 'react-icons/hi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

import './style.css';

function DashboardInfo() {
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
          <h4>Rp.20.000.000</h4>
        </div>
      </div>
      <div className="divider"></div>
      <div className="dashboard-info-item d-flex align-items-center">
        <div className="dashboard-info-item-icon item-blue">
          <HiDocumentDuplicate size={45} className="search-icon icon-blue" />
        </div>
        <div className="dashboard-info-item-content ms-4">
          <span>Proyek Dikerjakan</span>
          <h4>8</h4>
        </div>
      </div>
      <div className="divider"></div>
      <div className="dashboard-info-item d-flex align-items-center">
        <div className="dashboard-info-item-icon item-red">
          <IoCheckmarkDoneCircle size={45} className="search-icon icon-red" />
        </div>
        <div className="dashboard-info-item-content ms-4">
          <span>Proyek Selesai</span>
          <h4>87</h4>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
