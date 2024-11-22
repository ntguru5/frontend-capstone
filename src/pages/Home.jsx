import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import LineGraph from '../components/LineGraph.jsx';
import PieChart from '../components/PieChart.jsx';
import BathroomLogModal from '../components/bathroomLogModal.jsx';

export default function Home() {
  const [isBathroomModalOpen, setIsBathroomModalOpen] = useState(false);
  const [bathroomData, setBathroomData] = useState({
    pee: {
      data: [],
      labels: []
    },
    poop: {
      data: [],
      labels: []
    },
    consistency: {
      data: [0, 0, 0],
      labels: ['Normal', 'Soft', 'Hard']
    },
    mostCommonTime: {
      time: '',
      description: ''
    }
  });

  const fetchBathroomData = async () => {
    try {
      const response = await fetch('/api/bathroom-logs/stats');
      const data = await response.json();
      if (data.success) {
        // Calculate most common time from the logs
        const times = data.data.pee.times.concat(data.data.poop.times);
        const timeCount = times.reduce((acc, time) => {
          const hour = new Date(time).getHours();
          const formattedHour = new Date(time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          acc[hour] = acc[hour] || { count: 0, formatted: formattedHour };
          acc[hour].count++;
          return acc;
        }, {});

        const mostCommon = Object.entries(timeCount).reduce((a, b) =>
          timeCount[a].count > timeCount[b].count ? a : b
        );

        const updatedData = {
          ...data.data,
          mostCommonTime: {
            time: timeCount[mostCommon].formatted,
            description: getMostCommonTimeDescription(parseInt(mostCommon))
          }
        };

        setBathroomData(updatedData);
      }
    } catch (err) {
      console.error('Error fetching bathroom data:', err);
    }
  };

  const getMostCommonTimeDescription = (hour) => {
    if (hour >= 5 && hour < 10) return 'Morning walk';
    if (hour >= 10 && hour < 12) return 'Late morning walk';
    if (hour >= 12 && hour < 15) return 'Afternoon walk';
    if (hour >= 15 && hour < 18) return 'Late afternoon walk';
    if (hour >= 18 && hour < 22) return 'Evening walk';
    return 'Night walk';
  };

  useEffect(() => {
    fetchBathroomData();
  }, []);

  const handleAddBathroomLog = async (logData) => {
    try {
      const response = await fetch('/api/bathroom-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logData)
      });

      if (!response.ok) throw new Error('Failed to add log');

      // Refresh the data after adding a new log
      fetchBathroomData();
      setIsBathroomModalOpen(false);
    } catch (err) {
      console.error('Error adding bathroom log:', err);
    }
  };

  return (
    <div className="p-8 ml-20 min-h-screen relative">
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none ml-20">
        <span className="text-[40rem]">💩</span>
      </div>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Pet Health Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Urination Frequency</h2>
              <button
                onClick={() => setIsBathroomModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                Add Log
              </button>
            </div>
            <LineGraph
              title="Times per Day"
              data={bathroomData.pee.data}
              labels={bathroomData.pee.labels}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Defecation Frequency</h2>
              <button
                onClick={() => setIsBathroomModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                Add Log
              </button>
            </div>
            <LineGraph
              title="Times per Day"
              data={bathroomData.poop.data}
              labels={bathroomData.poop.labels}
            />
          </div>
        </div>

        <div className="max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Stool Consistency Distribution</h2>
          </div>
          <PieChart
            data={bathroomData.consistency.data}
            labels={bathroomData.consistency.labels}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Urination</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {bathroomData.pee.data.length > 0
                ? (bathroomData.pee.data.reduce((a, b) => a + b, 0) / bathroomData.pee.data.length).toFixed(1)
                : '0'}x/day
            </p>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Defecation</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {bathroomData.poop.data.length > 0
                ? (bathroomData.poop.data.reduce((a, b) => a + b, 0) / bathroomData.poop.data.length).toFixed(1)
                : '0'}x/day
            </p>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Most Common Time</h3>
            <p className="text-2xl font-semibold text-gray-900">{bathroomData.mostCommonTime.time || 'N/A'}</p>
            <p className="text-sm text-gray-500 mt-1">{bathroomData.mostCommonTime.description}</p>
          </div>
        </div>
      </div>

      <BathroomLogModal
        isOpen={isBathroomModalOpen}
        onClose={() => setIsBathroomModalOpen(false)}
        onSubmit={handleAddBathroomLog}
      />
    </div>
  );
}
