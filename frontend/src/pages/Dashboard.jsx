import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, TrendingUp, Users, Activity, Eye } from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/threats/stats');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const getSeverityColor = (severity) => {
    if (severity >= 8) return 'text-red-400';
    if (severity >= 6) return 'text-orange-400';
    if (severity >= 4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSeverityLabel = (severity) => {
    if (severity >= 8) return 'Critical';
    if (severity >= 6) return 'High';
    if (severity >= 4) return 'Medium';
    return 'Low';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <LoadingSpinner message="Loading dashboard..." />
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

  if (!stats) {
    return (
      <Layout>
        <div className="p-6">
          <p className="text-gray-400">No data available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
          <p className="text-gray-400">Monitor and analyze cybersecurity threats in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Threats"
            value={stats.total}
            icon={Shield}
            color="bg-blue-600"
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Active Monitoring"
            value="24/7"
            icon={Activity}
            color="bg-green-600"
          />
          <StatCard
            title="Response Time"
            value="< 2min"
            icon={TrendingUp}
            color="bg-purple-600"
          />
          <StatCard
            title="Protected Assets"
            value="1,247"
            icon={Users}
            color="bg-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threats by Category */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Threats by Category</h3>
            <div className="space-y-3">
              {stats.byCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <span className="text-white font-medium">{category.threat_category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">{category.count}</span>
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-orange-400 h-2 rounded-full" 
                        style={{ width: `${(category.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threats by Severity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Severity Distribution</h3>
            <div className="space-y-3">
              {stats.bySeverity.map((severity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity.severity_score).replace('text-', 'bg-')}`}></div>
                    <span className="text-white font-medium">
                      {getSeverityLabel(severity.severity_score)} ({severity.severity_score})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">{severity.count}</span>
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getSeverityColor(severity.severity_score).replace('text-', 'bg-')}`}
                        style={{ width: `${(severity.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/threats')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>View All Threats</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
