import React, { useState } from 'react';
import './App.css'; // Custom styles for layout
import DiabetesForm from './DiabetesForm';
import HypertensionForm from './HypertensionForm';
import HeartForm from './HeartForm';

const App = () => {
  const [selectedForm, setSelectedForm] = useState('diabetes'); // To track which form is selected

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>CareCast</h2>
        <ul>
          <li onClick={() => setSelectedForm('diabetes')}>Diabetes Prediction</li>
          <li onClick={() => setSelectedForm('hypertension')}>Hypertension Prediction</li>
          <li onClick={() => setSelectedForm('heart')}>Heart Disease Prediction</li>
        </ul>
      </div>

      <div className="main-content">
        {selectedForm === 'diabetes' && <DiabetesForm />}
        {selectedForm === 'hypertension' && <HypertensionForm />}
        {selectedForm === 'heart' && <HeartForm />}
      </div>
    </div>
  );
};

export default App;
