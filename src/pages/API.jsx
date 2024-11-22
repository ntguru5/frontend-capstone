import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function API() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDogImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      if (data.status === 'success') {
        setDogImage(data.message);
        setError('');
      } else {
        setError('Failed to fetch dog image');
      }
    } catch (err) {
      setError('Error fetching dog image');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div className="p-8 ml-20">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Eyebleach</h1>

      <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Random Dog Image API</h2>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            https://dog.ceo/api/breeds/image/random
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
            <button
              onClick={fetchDogImage}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Fetch!
            </button>
          </div>

          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : (
              <img
                src={dogImage}
                alt="Random Dog"
                className="w-full h-full object-cover"
                style={{ minHeight: '300px' }}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
