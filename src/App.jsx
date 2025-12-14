import React, { useState } from 'react';

const App = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', score: '', kkm: 75 },
    { id: 2, name: 'Physics', score: '', kkm: 70 },
    { id: 3, name: 'Chemistry', score: '', kkm: 70 },
    { id: 4, name: 'Biology', score: '', kkm: 70 },
  ]);
  const [targetAverage, setTargetAverage] = useState('');
  const [globalKKM, setGlobalKKM] = useState(75);
  const [useGlobalKKM, setUseGlobalKKM] = useState(true);

  const handleCalculate = () => {
    const validSubjects = subjects.filter(s => s.score !== '' && !isNaN(parseFloat(s.score)));
    if (validSubjects.length === 0) return;
    
    const total = validSubjects.reduce((sum, s) => sum + parseFloat(s.score), 0);
    return (total / validSubjects.length).toFixed(1);
  };

  const calculateResults = () => {
    const validSubjects = subjects.filter(s => s.score !== '' && !isNaN(parseFloat(s.score)));
    const total = validSubjects.reduce((sum, s) => sum + parseFloat(s.score), 0);
    const average = validSubjects.length > 0 ? (total / validSubjects.length).toFixed(1) : 0;
    const passed = validSubjects.filter(s => parseFloat(s.score) >= s.kkm).length;
    
    return { average, passed, total: validSubjects.length };
  };

  const results = calculateResults();

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>📊 Grade Calculator Pro</h1>
          <p>Professional Academic Score Analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Settings Section */}
        <div className="card">
          <h2>⚙️ Settings</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label>Target Average (Optional)</label>
              <div className="input-with-suffix">
                <input 
                  type="number" 
                  value={targetAverage}
                  onChange={(e) => setTargetAverage(e.target.value)}
                  placeholder="e.g., 80"
                  min="0"
                  max="100"
                />
                <span>/100</span>
              </div>
            </div>
            
            <div className="setting-item">
              <label>Global KKM</label>
              <div className="input-with-suffix">
                <input 
                  type="number" 
                  value={globalKKM}
                  onChange={(e) => setGlobalKKM(parseInt(e.target.value) || 75)}
                  min="0"
                  max="100"
                />
                <span>/100</span>
              </div>
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  checked={useGlobalKKM}
                  onChange={() => setUseGlobalKKM(!useGlobalKKM)}
                  id="global-kkm"
                />
                <label htmlFor="global-kkm">Use Global KKM</label>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Input */}
        <div className="card">
          <div className="card-header">
            <h2>📚 Subjects & Scores</h2>
            <button 
              className="btn-secondary"
              onClick={() => {
                const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
                setSubjects([...subjects, { 
                  id: newId, 
                  name: `Subject ${newId}`, 
                  score: '', 
                  kkm: globalKKM 
                }]);
              }}
            >
              + Add Subject
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>KKM</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.id}>
                    <td>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => {
                          const newSubjects = [...subjects];
                          newSubjects[index].name = e.target.value;
                          setSubjects(newSubjects);
                        }}
                        className="subject-input"
                      />
                    </td>
                    <td>
                      <div className="input-with-suffix small">
                        <input
                          type="number"
                          value={subject.score}
                          onChange={(e) => {
                            const newSubjects = [...subjects];
                            newSubjects[index].score = e.target.value;
                            setSubjects(newSubjects);
                          }}
                          min="0"
                          max="100"
                          placeholder="0-100"
                        />
                        <span>/100</span>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={subject.kkm}
                        onChange={(e) => {
                          const newSubjects = [...subjects];
                          newSubjects[index].kkm = parseInt(e.target.value) || 75;
                          setSubjects(newSubjects);
                        }}
                        min="0"
                        max="100"
                        disabled={useGlobalKKM}
                      />
                    </td>
                    <td>
                      <span className={`status-badge ${
                        subject.score && parseFloat(subject.score) >= subject.kkm 
                          ? 'status-pass' 
                          : 'status-fail'
                      }`}>
                        {subject.score ? 
                          (parseFloat(subject.score) >= subject.kkm ? 'PASS' : 'REMEDIAL') 
                          : '-'
                        }
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-delete"
                        onClick={() => {
                          if (subjects.length > 1) {
                            setSubjects(subjects.filter(s => s.id !== subject.id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => window.print()}>
            🖨️ Print Report
          </button>
          <button className="btn-secondary" onClick={() => {
            const data = { subjects, results, timestamp: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `grades-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
          }}>
            💾 Export JSON
          </button>
        </div>

        {/* Results Section */}
        {results.total > 0 && (
          <div className="card results-card">
            <h2>📈 Results Summary</h2>
            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Average Score</div>
                <div className="result-value">{results.average}</div>
                <div className="result-sub">/ 100 points</div>
              </div>
              
              <div className="result-item">
                <div className="result-label">Subjects</div>
                <div className="result-value">{results.total}</div>
                <div className="result-sub">total subjects</div>
              </div>
              
              <div className="result-item">
                <div className="result-label">Passed</div>
                <div className="result-value">{results.passed}/{results.total}</div>
                <div className="result-sub">{((results.passed/results.total)*100).toFixed(0)}% success</div>
              </div>
              
              {targetAverage && (
                <div className="result-item">
                  <div className="result-label">Target Diff</div>
                  <div className={`result-value ${
                    parseFloat(results.average) >= parseFloat(targetAverage) 
                      ? 'positive' 
                      : 'negative'
                  }`}>
                    {parseFloat(results.average) >= parseFloat(targetAverage) ? '+' : ''}
                    {(parseFloat(results.average) - parseFloat(targetAverage)).toFixed(1)}
                  </div>
                  <div className="result-sub">vs target: {targetAverage}</div>
                </div>
              )}
            </div>
            
            {/* Progress Bars */}
            <div className="progress-section">
              <h3>Subject Performance</h3>
              {subjects
                .filter(s => s.score && !isNaN(parseFloat(s.score)))
                .map((subject) => {
                  const percentage = (parseFloat(subject.score) / 100) * 100;
                  const isPassed = parseFloat(subject.score) >= subject.kkm;
                  
                  return (
                    <div key={subject.id} className="progress-item">
                      <div className="progress-header">
                        <span className="progress-label">{subject.name}</span>
                        <span className="progress-score">{subject.score}/100</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${isPassed ? 'fill-pass' : 'fill-fail'}`}
                          style={{ width: `${percentage}%` }}
                        >
                          <div className="progress-marker" style={{ left: `${subject.kkm}%` }}>
                            <span className="marker-label">KKM: {subject.kkm}</span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-footer">
                        <span>Difference: {
                          parseFloat(subject.score) - subject.kkm >= 0 ? '+' : ''
                        }{parseFloat(subject.score) - subject.kkm}</span>
                        <span className={`status-text ${isPassed ? 'text-pass' : 'text-fail'}`}>
                          {isPassed ? '✓ PASSED' : '✗ NEED IMPROVEMENT'}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-main">
            <p>Grade Calculator Pro • Professional Academic Analysis Tool</p>
            <p className="copyright">© 2025 • All rights reserved</p>
          </div>
          
          <div className="footer-thanks">
            <p>Thanks to: AI DeepSeek • Teachers • God • Me: 蕭Ga</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;