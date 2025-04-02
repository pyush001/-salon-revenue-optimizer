import React, { useState } from 'react';
import './App.css';

function App() {
  const [month, setMonth] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!month) return;
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: parseInt(month) }),
      });

      const data = await response.json();
      setPrediction(data.predicted_revenue);
    } catch (error) {
      console.error('Prediction error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>💇 Salon Revenue Predictor</h1>

      <input
        type="number"
        placeholder="Enter future month number"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
      />

      <br />

      <button
        onClick={handlePredict}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Predicting...' : 'Predict Revenue'}
      </button>

      {prediction !== null && (
        <h2 style={{ marginTop: '20px' }}>💰 Predicted Revenue: ${prediction}</h2>
      )}
    </div>
  );
}

export default App;