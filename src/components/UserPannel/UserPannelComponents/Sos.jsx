import React from 'react';

const Sos = () => {
  return (
    <div className="bg-zinc-800 text-white min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg bg-zinc-900 w-full max-w-4xl -mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-500">Emergency Contacts</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-red-500 py-4 text-left text-xl">Service</th>
              <th className="border-b-2 border-red-500 py-4 text-right text-xl">Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Fire Brigade</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">101</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Ambulance</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">102</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Police</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">100</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Child Helpline</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">1098</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Women Helpline</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">1091</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 py-4 text-lg">Disaster Management</td>
              <td className="border-b border-gray-700 py-4 text-right text-lg">108</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sos;
