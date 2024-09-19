import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyReturnsChart = ({ monthlyReturns, inflationAdjustedReturns }) => {
  const chartData = {
    labels: monthlyReturns.map((_, index) => `Month ${index + 1}`),
    datasets: [
      {
        label: "Nominal Return",
        data: monthlyReturns,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Inflation Adjusted Return",
        data: inflationAdjustedReturns,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Monthly Return Breakdown
      </h3>
      <div className="relative h-80">
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default MonthlyReturnsChart;
