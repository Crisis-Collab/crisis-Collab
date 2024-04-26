import React from 'react';

const HelpAndSupportDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Help and Support</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Option</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Frequently Asked Questions</td>
            <td className="border px-4 py-2">Find answers to common questions.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">View FAQ</button></td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Contact Support</td>
            <td className="border px-4 py-2">Get in touch with our support team.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Contact Support</button></td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Live Chat</td>
            <td className="border px-4 py-2">Chat with a support agent in real-time.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Start Chat</button></td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Knowledge Base</td>
            <td className="border px-4 py-2">Explore helpful articles and guides.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Browse Knowledge Base</button></td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Submit a Ticket</td>
            <td className="border px-4 py-2">Submit a support ticket for assistance.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Submit Ticket</button></td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Video Tutorials</td>
            <td className="border px-4 py-2">Watch video tutorials for help.</td>
            <td className="border px-4 py-2"><button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Watch Videos</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HelpAndSupportDashboard;
