import React, { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import api from '../../Utils/ApiEndpoint';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Desember',
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Data Project',
    },
  },
};

function DataChart() {
  const [projectsStatsPerMonth, setProjectsStatsPerMonth] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectRevenue, setProjectRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let tmpProjectData = [];
      let tmpRevenueData = [];
      const response = await api.get('/project/all/month');
      for (let i = 0; i < labels.length; i++) {
        let month = labels[i];
        let data = response.data.data.find(
          (project) => project.month === month
        );

        if (data) {
          tmpProjectData.push(data.totalProjects);
          tmpRevenueData.push(data.totalRevenue);
        } else {
          tmpProjectData.push(0);
          tmpRevenueData.push(0);
        }
      }
      setProjectData(tmpProjectData);
      setProjectRevenue(tmpRevenueData);
    };

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Project Dikerjakan',
        data: projectData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderRadius: 50,
      },
      {
        label: 'Pendapatan',
        data: projectRevenue,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderRadius: 50,
        type: 'line',
        tension: 0.1,
        yAxisID: 'income-axis',
      },
    ],
  };

  return (
    <div className="chart-data">
      <Bar data={data} options={options} />
    </div>
  );
}

export default DataChart;
