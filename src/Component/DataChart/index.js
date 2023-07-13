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

function DataChart() {
  const [projectsStatsPerMonth, setProjectsStatsPerMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/project/all/month');
      console.log(response.data.data);
      setProjectsStatsPerMonth(response.data.data);
    };

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Project Dikerjakan',
        data: projectsStatsPerMonth.map((project) => project.totalProjects),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderRadius: 50,
      },
      {
        label: 'Pendapatan',
        data: projectsStatsPerMonth.map((project) => project.totalRevenue),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderRadius: 50,
        type: 'line',
        yAxisID: 'income-axis',
      },
    ],
  };

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

  return (
    <div className="chart-data">
      <Bar data={data} options={options} />
    </div>
  );
}

export default DataChart;
