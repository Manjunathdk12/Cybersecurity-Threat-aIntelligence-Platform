// Threats/ThreatCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calendar, AlertTriangle } from 'lucide-react';

const getSeverityColor = (score) => {
  if (score >= 8) return 'text-red-400 bg-red-900/30 border-red-500';
  if (score >= 6) return 'text-orange-400 bg-orange-900/30 border-orange-500';
  if (score >= 4) return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
  return 'text-green-400 bg-green-900/30 border-green-500';
};

const getSeverityLabel = (score) => {
  if (score >= 8) return 'Critical';
  if (score >= 6) return 'High';
  if (score >= 4) return 'Medium';
  return 'Low';
};

const ThreatCard = ({ threat }) => (
  <Link to={`/threats/${threat.id}`}>
    <div className="bg-gray-800 rounded-lg p-6 m-6 border border-gray-700 hover:border-gray-600">
      <div className="flex items-center space-x-3 mb-3">
        <Shield className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">{threat.threat_category}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity_score)}`}>
          {getSeverityLabel(threat.severity_score)}
        </span>
      </div>
      <p className="text-gray-300 mb-3">
        {threat.description.length > 200
          ? `${threat.description.slice(0, 200)}...`
          : threat.description}
      </p>
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{new Date(threat.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <AlertTriangle className="h-4 w-4" />
          <span>Severity: {threat.severity_score}/10</span>
        </div>
      </div>
    </div>
  </Link>
);

export default ThreatCard;
