import { useState,useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';
import BathroomLogModal from '../components/bathroomLogModal';
import FeedingLogModal from '../components/feedingLogModal';
// import { bathroomApi, feedingApi } from '../api/axios.js';

export default function Logs() {
  const [isBathroomModalOpen, setIsBathroomModalOpen] = useState(false);
  const [isFeedingModalOpen, setIsFeedingModalOpen] = useState(false);
  const [behaviors, setBehaviors] = useState([]);
  const [feeding, setFeeding] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    try {
      const [bathroomData, feedingData] = await Promise.all([
        axios.get('/api/bathroom-logs'),
        axios.get('/api/feeding')
      ]);

      setBehaviors(bathroomData.data.data || []);
      setFeeding(feedingData.data.data || []);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching logs:', err.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAddBathroomLog = async (logData) => {
    try {
      await axios.post('/api/bathroom-logs', logData);
      fetchLogs();
      setIsBathroomModalOpen(false);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error adding log:', err.message);
    }
  };

  const handleAddFeedingLog = async (logData) => {
    try {
      await axios.post('/api/feeding', logData);
      fetchLogs();
      setIsFeedingModalOpen(false);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error adding feeding log:', err.message);
    }
  };

  const handleDeleteBathroomLog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;

    try {
      await axios.delete(`/api/bathroom-logs/${id}`);
      fetchLogs();
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting log:', err.message);
    }
  };

  const handleDeleteFeedingLog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feeding log?')) return;

    try {
      await axios.delete(`/api/feeding/${id}`);
      fetchLogs();
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting feeding log:', err.message);
    }
  };

  const handleEditBathroomLog = async (logData) => {
    try {
      await axios.patch(`/api/bathroom-logs/${selectedLog._id}`, logData);
      fetchLogs();
      setSelectedLog(null);
      setIsBathroomModalOpen(false);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error updating log:', err.message);
    }
  };

  const handleEditFeedingLog = async (logData) => {
    try {
      await axios.patch(`/api/feeding/${selectedLog._id}`, logData);
      fetchLogs();
      setSelectedLog(null);
      setIsFeedingModalOpen(false);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error updating feeding log:', err.message);
    }
  };

  const openBathroomModal = (log = null) => {
    setSelectedLog(log);
    setIsBathroomModalOpen(true);
  };

  const openFeedingModal = (log = null) => {
    setSelectedLog(log);
    setIsFeedingModalOpen(true);
  };

  return (
    <div className="p-8 ml-20">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Activity Logs</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Bathroom</h2>
          <button
            onClick={() => openBathroomModal()}
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
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {`${item.type}${item.notes ? ` - ${item.notes}` : ''}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openBathroomModal(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBathroomLog(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
            onClick={() => openFeedingModal()}
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
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {`${item.foodType} - ${item.amount} ${item.brand ? `(${item.brand})` : ''}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openFeedingModal(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteFeedingLog(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
        onClose={() => {
          setIsBathroomModalOpen(false);
          setSelectedLog(null);
        }}
        onSubmit={selectedLog ? handleEditBathroomLog : handleAddBathroomLog}
        initialData={selectedLog}
      />

      <FeedingLogModal
        isOpen={isFeedingModalOpen}
        onClose={() => {
          setIsFeedingModalOpen(false);
          setSelectedLog(null);
        }}
        onSubmit={selectedLog ? handleEditFeedingLog : handleAddFeedingLog}
        initialData={selectedLog}
      />
    </div>
  );
}
