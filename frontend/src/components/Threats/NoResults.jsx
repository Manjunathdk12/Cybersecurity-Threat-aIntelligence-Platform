// Threats/NoResults.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const NoResults = () => (
  <div className="text-center py-12">
    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-400">No threats found matching your criteria</p>
  </div>
);

export default NoResults;