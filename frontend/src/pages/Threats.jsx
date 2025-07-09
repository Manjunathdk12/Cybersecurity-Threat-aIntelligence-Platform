import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from "../components/Threats/SearchBar";
import ThreatList from "../components/Threats/ThreatList";
import Pagination from "../components/Threats/Pagination";
import NoResults from "../components/Threats/NoResults";

const Threats = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [threats, setThreats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
    fetchThreats(page, true);
  }, [debouncedSearchTerm, selectedCategory, page, limit]);

  const buildQueryParams = (pageNum) => {
    let url = `http://localhost:5000/api/threats?page=${pageNum}&limit=${limit}`;
    if (selectedCategory !== 'all') url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (debouncedSearchTerm.trim()) url += `&search=${encodeURIComponent(debouncedSearchTerm.trim())}`;
    return url;
  };

  const fetchThreats = async (pageNum, reset = false) => {
    if (reset) setIsLoading(true);
    else setIsFetchingMore(true);

    try {
      const res = await axios.get(buildQueryParams(pageNum));
      const newThreats = res.data.data;
      setTotalCount(res.data.totalCount);

      if (reset) setThreats(newThreats);
      else setThreats(prev => [...prev, ...newThreats]);

      setHasMore(newThreats.length === limit && (pageNum * limit) < res.data.totalCount);
    } catch (err) {
      setError('Failed to load threats');
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) updated.set(key, value);
        else updated.delete(key);
      });
      return updated;
    });
  };

  const categories = ['all', ...new Set(threats.map(t => t.threat_category))];

  return (
    <Layout>
      <div className="p-6">
        <SearchBar
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          updateSearchParams={updateSearchParams}
        />

        {isLoading ? (
          <LoadingSpinner message="Fetching threats..." />
        ) : threats.length === 0 ? (
          <NoResults />
        ) : (
          <ThreatList threats={threats} />
        )}

        {totalCount > 0 && (
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
            updateSearchParams={updateSearchParams}
          />
        )}
      </div>
    </Layout>
  );
};

export default Threats;