// src/components/FAQ.js
import React, { useState } from 'react';

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex justify-start items-center bg-gray-200 rounded-md p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-base font-semibold">{question}</h2>
        <span className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}>
          &#9660;
        </span>
      </div>
      {isOpen && <div className="p-4 bg-white">{answer}</div>}
    </div>
  );
};

export default FAQ;

