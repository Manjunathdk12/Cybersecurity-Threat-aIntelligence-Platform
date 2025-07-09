import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, AlertTriangle, Shield } from 'lucide-react';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const ThreatDetails = () => {
  const { id } = useParams();
  const [threat, setThreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchThreat = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/threats/${id}`);
        setThreat(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Threat not found.');
        } else {
          setError('Failed to fetch threat data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThreat();
  }, [id, navigate]);

  const getSeverityColor = (severity) => {
    if (severity >= 8) return 'text-red-400 bg-red-900/30 border-red-500';
    if (severity >= 6) return 'text-orange-400 bg-orange-900/30 border-orange-500';
    if (severity >= 4) return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
    return 'text-green-400 bg-green-900/30 border-green-500';
  };

  const getSeverityLabel = (severity) => {
    if (severity >= 8) return 'Critical';
    if (severity >= 6) return 'High';
    if (severity >= 4) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <LoadingSpinner message="Loading threat details..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-900/50 border border-red-500 rounded-md p-4">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Threat Details</h1>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">{threat.threat_category}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity_score)}`}>
              {getSeverityLabel(threat.severity_score)}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{threat.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(threat.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Severity Score: {threat.severity_score}/10</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThreatDetails;
