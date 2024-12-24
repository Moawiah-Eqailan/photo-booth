import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import FrameSelectionPage from './components/FrameSelectionPage';
import CameraPage from './components/CameraPage';
import DataEntryPage from './components/DataEntryPage';
import ShowQrcode from './components/ShowQrcode'; 
import './assets/css/style.css';
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState('');
  const [selectedFrame, setSelectedFrame] = useState(null);
  const navigate = useNavigate();

  const startCamera = () => {
    navigate('/frame-selection');
  };
  
  const selectFrame = (frameNumber) => {
    setSelectedFrame(frameNumber);
    navigate('/camera');
  };
  
  const capturePhoto = (photos) => {
    setImagePath(photos);
    navigate('/data-entry');
  };

  return (
      <Routes>
        <Route path="/" element={<WelcomePage startCamera={startCamera} />} />
        <Route
          path="/frame-selection"
          element={<FrameSelectionPage selectFrame={selectFrame} imagePath={imagePath} />}
        />
        <Route
          path="/camera"
          element={<CameraPage capturePhoto={capturePhoto} selectedFrame={selectedFrame} />}
        />
        <Route path="/data-entry" element={<DataEntryPage imagePath={imagePath} />} />
        <Route path="/show-qrcode" element={<ShowQrcode />} />
      </Routes>
 
  );
}

export default App;
