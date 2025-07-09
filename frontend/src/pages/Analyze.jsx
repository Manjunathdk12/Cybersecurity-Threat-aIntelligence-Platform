import React, { useState } from "react";
import axios from "axios";
import { BrainCircuit } from "lucide-react";

const Analyze = () => {
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", { description });
      setPrediction(res.data.predicted_category);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "ransomware":
        return "bg-red-700 border-red-500 text-white";
      case "ddos":
        return "bg-orange-700 border-orange-500 text-white";
      case "phishing":
        return "bg-yellow-500 border-yellow-400 text-black";
      case "malware":
        return "bg-purple-700 border-purple-500 text-white";
      default:
        return "bg-gray-700 border-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BrainCircuit className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Threat Description Analysis</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-32 p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter threat description (e.g., 'phishing email with malicious link')..."
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Analyze
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-md">
            {error}
          </div>
        )}

        {prediction && (
          <div
            className={`mt-6 p-4 rounded-md border shadow-md ${getCategoryColor(prediction)}`}
          >
            <h3 className="text-lg font-semibold">Predicted Threat Category:</h3>
            <p className="text-xl mt-1">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
