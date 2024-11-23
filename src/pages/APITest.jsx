import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function APITest () {
  console.log('component mounted');
  const [dogProfile, setDogProfile] = useState([]);

  useEffect(() => {
    fetchDogProfile();
  }, []);

  const fetchDogProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/dogs/673f7bb2851574a5fed5bbdf');
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch dog profile');
      const data = await response.json();
      setDogProfile(data);
      console.log(data);
      // const { data } = await axios.get('http://localhost:3000/api/dogs/673f7bb2851574a5fed5bbdf');
      // setDogProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
    <h1>Dog Profile</h1>
    <p>Name: {dogProfile.name}</p>
    <p>Breed: {dogProfile.breed}</p>
    <p>Age: {dogProfile.age}</p>
  </div>
  );
};
