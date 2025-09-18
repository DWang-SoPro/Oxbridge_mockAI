import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import './App.css'; // 用于自定义CSS

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-gradient text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}> {/* 自定义渐变 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:university/:subject" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;