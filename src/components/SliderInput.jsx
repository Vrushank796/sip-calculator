import React from "react";

const SliderInput = ({ label, value, onChange, min, max, step }) => (
  <div className="flex flex-col mb-4">
    <label className="text-lg font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range-slider"
    />
    <div className="flex justify-between text-sm text-gray-600">
      <span>{min}</span>
      <span>{value}</span>
      <span>{max}</span>
    </div>
  </div>
);

export default SliderInput;
