import React from "react";

const Glossary = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Glossary</h3>
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>
        <strong>SIP:</strong> Systematic Investment Plan
      </li>
      <li>
        <strong>Compound Interest:</strong> Interest on interest
      </li>
      <li>
        <strong>Inflation:</strong> Increase in prices over time
      </li>
      <li>
        <strong>Annual Percentage Rate (APR):</strong> The yearly interest rate
      </li>
    </ul>
  </div>
);

export default Glossary;
