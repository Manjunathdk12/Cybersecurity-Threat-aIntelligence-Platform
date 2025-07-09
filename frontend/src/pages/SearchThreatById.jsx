// src/pages/SearchThreatById.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const SearchThreatById = () => {
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      setError('Please enter a threat ID.');
      return;
    }

    setError('');
    navigate(`/threats/${searchId.trim()}`);
  };

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Search Threat by ID</h1>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter threat ID"
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-400 mt-3">{error}</p>}
      </div>
    </Layout>
  );
};

export default SearchThreatById;
