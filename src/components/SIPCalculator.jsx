"use client";

import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registering the necessary elements for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SIPCalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);
  const [data, setData] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalFutureValue, setTotalFutureValue] = useState(0);

  const calculateSIP = (P, r, t, inflation) => {
    const n = 12; // Monthly compounding
    const monthlyRate = r / 100 / n;
    const monthlyInflationRate = inflation / 100 / n;
    let futureValue = 0;
    let inflationAdjustedFutureValue = 0;
    const resultData = [];
    const inflationAdjustedData = [];
    let totalInvestment = P * t * n;

    for (let year = 1; year <= t; year++) {
      const periods = year * n;
      futureValue =
        P *
        (((1 + monthlyRate) ** periods - 1) / monthlyRate) *
        (1 + monthlyRate);

      inflationAdjustedFutureValue =
        futureValue / (1 + monthlyInflationRate) ** periods;

      resultData.push({
        year: year,
        value: futureValue.toFixed(2),
        inflationAdjustedValue: inflationAdjustedFutureValue.toFixed(2),
      });
      inflationAdjustedData.push(inflationAdjustedFutureValue.toFixed(2));
    }

    setData(resultData);
    setTotalInvested(totalInvestment.toFixed(2));
    setTotalFutureValue(futureValue.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateSIP(amount, rate, years, inflationRate);
  };

  // Data for the line chart, including inflation-adjusted return
  const chartData = {
    labels: data.map((item) => `Year ${item.year}`),
    datasets: [
      {
        label: "Investment Growth",
        data: data.map((item) => item.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Inflation-Adjusted Return",
        data: data.map((item) => item.inflationAdjustedValue),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        borderDash: [5, 5], // Dashed line to differentiate it
      },
    ],
  };

  // Data for the donut chart (replacing pie chart)
  const donutData = {
    labels: ["Total Invested", "Interest Earned"],
    datasets: [
      {
        data: [
          totalInvested, // The total amount invested
          totalFutureValue - totalInvested, // The interest earned (future value minus total invested)
        ],
        backgroundColor: ["#cdc1de", "#4b0fa6"],
        hoverBackgroundColor: ["#432d63", "#320a6e"],
        cutout: "70%", // Creates the "donut" hole
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        SIP Calculator
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Amount Invested (Monthly)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Interest Rate (Annual %)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Years
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Inflation Rate (Annual %)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="md:col-span-4 flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Calculate
          </button>
        </div>
      </form>

      {/* Line Chart */}
      {data.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
            Investment Growth Over Time
          </h3>
          <div className="relative h-80">
            <Line
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}

      {/* Donut Chart */}
      {data.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
            Investment Composition
          </h3>
          <div className="relative h-64">
            <Doughnut
              data={donutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}

      {/* Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
            Yearly Investment Growth
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Future Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inflation-Adjusted Return
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.inflationAdjustedValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;
