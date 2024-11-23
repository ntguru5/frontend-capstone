import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';
import DogModal from '../components/DogModal';

export default function Profile() {
  const [dogs, setDogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [error, setError] = useState('');

  const fetchDogs = async () => {
    try {
      const { data } = await axios.get('/api/dogs');
      setDogs(data.data || []);
      console.log(data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch dogs');
      console.error('Error fetching dogs:', err.message);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleAdd = async (dogData) => {
    try {
      await axios.post('/api/dogs', dogData);
      fetchDogs();
      setIsModalOpen(false);
      setError('');
    } catch (err) {
      setError('Failed to add dog');
      console.error('Error adding dog:', err.message);
    }
  };

  const handleEdit = async (dogData) => {
    try {
      await axios.patch(`/api/dogs/${dogData._id}`, dogData);
      fetchDogs();
      setIsModalOpen(false);
      setSelectedDog(null);
      setError('');
    } catch (err) {
      setError('Failed to update dog');
      console.error('Error updating dog:', err.message);
    }
  };

  const handleDelete = async (dogId) => {
    if (!window.confirm('Are you sure you want to delete this dog?')) return;

    try {
      await axios.delete(`/api/dogs/${dogId}`);
      fetchDogs();
      setError('');
    } catch (err) {
      setError('Failed to delete dog');
      console.error('Error deleting dog:', err.message);
    }
  };

  const openModal = (dog = null) => {
    setSelectedDog(dog);
    setIsModalOpen(true);
  };

  const handleSubmit = (dogData) => {
    if (selectedDog) {
      handleEdit({ ...dogData, _id: selectedDog._id });
    } else {
      handleAdd(dogData);
    }
  };

  return (
    <div className="p-8 ml-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Pet Profiles</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Add New Pet
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <div key={dog._id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0">
                <img
                  src={dog.imageUrl || "https://cdn.pixabay.com/photo/2024/03/28/18/06/dog-8661433_1280.png"}
                  alt={dog.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2024/03/28/18/06/dog-8661433_1280.png";
                  }}
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{dog.name}</h2>
                    <p className="text-gray-500">{dog.breed}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => openModal(dog)}
                      className="p-2 text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(dog._id)}
                      className="p-2 text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Age</dt>
                    <dd className="text-sm text-gray-900">{dog.age} years</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Weight</dt>
                    <dd className="text-sm text-gray-900">{dog.weight} kg</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="text-sm text-gray-900">{dog.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                    <dd className="text-sm text-gray-900">{dog.ownerName}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDog(null);
        }}
        dog={selectedDog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
