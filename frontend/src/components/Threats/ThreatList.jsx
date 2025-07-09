// Threats/ThreatList.jsx
import React from 'react';
import ThreatCard from './ThreatCard';

const ThreatList = ({ threats }) => (
  <div className="space-y-4">
    {threats.map((threat) => (
      <ThreatCard key={threat.id} threat={threat} />
    ))}
  </div>
);

export default ThreatList;