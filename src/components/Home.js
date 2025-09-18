import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const universities = ['牛津大学 (Oxford)', '剑桥大学 (Cambridge)'];
  const subjects = ['数学 (Mathematics)', '物理 (Physics)', '化学 (Chemistry)', '工程 (Engineering)', '经济 (Economics)'];
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedSub, setSelectedSub] = useState('');

  const startInterview = () => {
    if (selectedUni && selectedSub) {
      const uni = selectedUni === '牛津大学 (Oxford)' ? 'oxford' : 'cambridge';
      const sub = selectedSub.split(' (')[0].toLowerCase();
      navigate(`/chat/${uni}/${sub}`);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
      <div className="text-center">
        <h1 className="display-4 mb-4">本科入学面试模拟器</h1>
        <div className="card glass shadow-lg mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-4">
            <select className="form-select mb-3 bg-light text-dark" value={selectedUni} onChange={(e) => setSelectedUni(e.target.value)}>
              <option value="">选择大学</option>
              {universities.map(u => <option key={u}>{u}</option>)}
            </select>
            <select className="form-select mb-3 bg-light text-dark" value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)}>
              <option value="">选择学科</option>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={startInterview} className="btn btn-primary w-100">开始英语面试</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;