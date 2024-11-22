import { useState,useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import BathroomLogModal from '../components/bathroomLogModal';
import FeedingLogModal from '../components/feedingLogModal';

export default function Logs() {
  const [isBathroomModalOpen, setIsBathroomModalOpen] = useState(false);
  const [isFeedingModalOpen, setIsFeedingModalOpen] = useState(false);

  const behaviors = [
    { time: '08:00 AM', data: 'Morning walk - 20 minutes', id: 1 },
    { time: '09:30 AM', data: 'Breakfast - 1 cup dry food', id: 2 },
    { time: '02:00 PM', data: 'Afternoon nap', id: 3 },
  ];

  const feeding = [
    { time: '09:30 AM', data: 'Dry food - 1 cup', id: 1 },
    { time: '06:00 PM', data: 'Wet food - 1/2 can', id: 2 },
  ];

  const handleAddBathroomLog = async (logData) => {
    try {
      const response = await fetch('/api/bathroom-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) throw new Error('Failed to add bathroom log');
      console.log('Bathroom log added successfully');
    } catch (err) {
      console.error('Error adding bathroom log:', err);
    }
  };

  const handleAddFeedingLog = async (logData) => {
    try {
      const response = await fetch('/api/feeding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) throw new Error('Failed to add feeding log');
      console.log('Feeding log added successfully');
    } catch (err) {
      console.error('Error adding feeding log:', err);
    }
  };

  return (
    <div className="p-8 ml-20">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Activity Logs</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Behaviors</h2>
          <button
            onClick={() => setIsBathroomModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            Add Bathroom Log
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {behaviors.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Feeding</h2>
          <button
            onClick={() => setIsFeedingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            Add Feeding Log
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feeding.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BathroomLogModal
        isOpen={isBathroomModalOpen}
        onClose={() => setIsBathroomModalOpen(false)}
        onSubmit={handleAddBathroomLog}
      />

      <FeedingLogModal
        isOpen={isFeedingModalOpen}
        onClose={() => setIsFeedingModalOpen(false)}
        onSubmit={handleAddFeedingLog}
      />
    </div>
  );
}
