"use client";

import { useState } from "react";

const options = [
  { label: "นาย", value: "1" },
  { label: "นาง", value: "2" },
  { label: "นางสาว", value: "3" },
];

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/10 backdrop-blur-md border border-gray-400 rounded-lg px-4 py-3 text-white shadow-md focus:ring-2 focus:ring-cyan-400 text-left"
      >
        {selected.label}
      </button>

      <div
        className={`absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
