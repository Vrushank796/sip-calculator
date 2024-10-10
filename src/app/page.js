"use client";

import React, { useState } from "react";
import SIPCalculator from "../components/SIPCalculator";
import SliderInput from "../components/SliderInput";
import ExportOptions from "../components/ExportOptions";
import MonthlyBreakdownChart from "../components/MonthlyBreakdownChart";
import ComparisonChart from "../components/ComparisonChart";
import DarkModeToggle from "../components/DarkModeToggle";
import InvestmentTips from "../components/InvestmentTips";
import Glossary from "../components/Glossary";
import { calculateMonthlyReturns } from "@/utils/calculateReturns"; // Adjust the path as necessary

const Home = () => {
  const [investment, setInvestment] = useState(5000);
  const [interest, setInterest] = useState(7);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(2); // Ensure this is defined

  const handleExport = () => {
    // Implement CSV export
  };

  const { monthlyReturns, inflationAdjustedReturns } = calculateMonthlyReturns(
    investment,
    interest,
    years,
    inflationRate
  );

  return (
    <div className="container mx-auto p-4">
      {/* <DarkModeToggle /> */}
      <SIPCalculator
        investment={investment}
        interest={interest}
        years={years}
      />
      {/* <SliderInput
        label="Investment Amount"
        value={investment}
        onChange={setInvestment}
        min={0}
        max={1000000}
        step={500}
      />
      <SliderInput
        label="Interest Rate (%)"
        value={interest}
        onChange={setInterest}
        min={1}
        max={100}
        step={0.1}
      />
      <SliderInput
        label="Number of Years"
        value={years}
        onChange={setYears}
        min={1}
        max={100}
        step={1}
      />
      <SliderInput
        label="Inflation Rate (%)"
        value={inflationRate}
        onChange={setInflationRate}
        min={0}
        max={10}
        step={0.1}
      /> */}
      {/* <ExportOptions onExport={handleExport} /> */}
      {/* <MonthlyBreakdownChart
        monthlyReturns={monthlyReturns}
        inflationAdjustedReturns={inflationAdjustedReturns}
      /> */}
      {/* <ComparisonChart
        data1={monthlyReturns}
        data2={inflationAdjustedReturns}
      /> */}
      {/* <InvestmentTips />
      <Glossary /> */}
    </div>
  );
};

export default Home;
