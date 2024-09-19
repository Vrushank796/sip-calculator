import React from "react";
import Papa from "papaparse";

const ExportOptions = ({ data }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sip-data.csv");
    link.click();
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default ExportOptions;
