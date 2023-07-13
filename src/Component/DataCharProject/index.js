import React, { useState, useEffect } from 'react';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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

function DataChartProject() {
  const [dataProjectPerMonth, setDataProjectPerMonth] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/project/all/month/status');
      setDataProjectPerMonth(response.data.data);
    };
    fetchData();
  }, []);
  const data = {
    labels,
    datasets: [
      {
        label: 'Proyek Dikerjakan',
        tension: 0.1,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: dataProjectPerMonth.map(
          (project) => project.totalUnfinishedProjects
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Proyek Terselesaikan',
        tension: 0.1,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: dataProjectPerMonth.map(
          (project) => project.totalFinishedProjects
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line data={data} options={options} />;
}

export default DataChartProject;
