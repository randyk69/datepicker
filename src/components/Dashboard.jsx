import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import Datepicker from "react-tailwindcss-datepicker";
import data from "../data/data.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
      position: "top",
    },
  },
};

function Dashboard() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [selected, setSelected] = useState(false);

  const [totalClicks, setTotalClicks] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [chartData, setDataChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Clicks",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Impressions",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  const handleValueChange = (newValue) => {
    setValue(newValue);

    const sorted = data.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    const filtered = sorted.filter(
      ({ date }) =>
        new Date(date).toISOString().slice(0, 10) >= newValue.startDate &&
        new Date(date).toISOString().slice(0, 10) <= newValue.endDate
    );

    const clicks = filtered.reduce((a, b) => +a + +b.clicks, 0);
    const impressions = filtered.reduce((a, b) => +a + +b.impressions, 0);

    const labels = filtered.map((x) => x.date);
    chartData.datasets[0].data = filtered.map((x) => {
      return Number(x.clicks);
    });
    chartData.datasets[1].data = filtered.map((x) => {
      return Number(x.impressions);
    });
    chartData.labels = labels;

    setSelected(true);
    setDataChart(chartData);
    setTotalClicks((Math.round(clicks * 100) / 100).toFixed(2));

    setTotalImpressions(impressions);
  };

  return (
    <div>
      <div className='ml-[200px] mt-[20px]'>
        <div className='w-[300px] '>
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <div className='flex m-5'>
          <div className='mx-5 min-w-[300px]'>
            <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <SignalCellularAltIcon /> Total Clicks
                <div className='text-2xl font-bold'>{totalClicks}</div>
              </CardContent>
            </Card>
          </div>
          <div className='mx-5 min-w-[300px]'>
            <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <PieChartIcon /> Total Impressions
                <div className='text-2xl font-bold'>{totalImpressions}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        {selected && (
          <>
            <div>Product Trends by Month</div>
            <Line options={options} data={chartData} />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
