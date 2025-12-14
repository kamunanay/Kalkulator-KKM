import React, { useState, useEffect } from 'react';

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
  const [activeTab, setActiveTab] = useState('input');

  const calculateResults = () => {
    const validSubjects = subjects.filter(s => s.score !== '' && !isNaN(parseFloat(s.score)));
    if (validSubjects.length === 0) return null;
    
    const total = validSubjects.reduce((sum, s) => sum + parseFloat(s.score), 0);
    const average = (total / validSubjects.length).toFixed(1);
    const passed = validSubjects.filter(s => parseFloat(s.score) >= s.kkm).length;
    const highest = Math.max(...validSubjects.map(s => parseFloat(s.score)));
    const lowest = Math.min(...validSubjects.map(s => parseFloat(s.score)));
    
    return { 
      average, 
      passed, 
      total: validSubjects.length,
      highest,
      lowest,
      validSubjects
    };
  };

  const results = calculateResults();

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = {
      subjects,
      targetAverage,
      globalKKM,
      useGlobalKKM,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gradeCalculatorData', JSON.stringify(saveData));
  }, [subjects, targetAverage, globalKKM, useGlobalKKM]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('gradeCalculatorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.subjects) setSubjects(data.subjects);
        if (data.targetAverage) setTargetAverage(data.targetAverage);
        if (data.globalKKM) setGlobalKKM(data.globalKKM);
        if (data.useGlobalKKM !== undefined) setUseGlobalKKM(data.useGlobalKKM);
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-main">
          <div className="header-logo">
            <div className="logo-icon">📊</div>
            <div>
              <h1>Grade Calculator Pro</h1>
              <p>Professional Academic Analysis Tool</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="header-btn" 
              onClick={() => window.print()}
            >
              <span>🖨️</span> Print
            </button>
          </div>
        </div>
        
        <div className="header-tabs">
          <button 
            className={`tab-btn ${activeTab === 'input' ? 'active' : ''}`}
            onClick={() => setActiveTab('input')}
          >
            📝 Input Data
          </button>
          <button 
            className={`tab-btn ${activeTab === 'results' && results ? 'active' : ''}`}
            onClick={() => results && setActiveTab('results')}
            disabled={!results}
          >
            📊 View Results
          </button>
          <button 
            className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            💾 Export
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Input Tab */}
        {activeTab === 'input' && (
          <>
            {/* Settings Panel */}
            <div className="settings-panel">
              <div className="panel-card">
                <h3><span>🎯</span> Target Settings</h3>
                <div className="settings-grid">
                  <div className="setting">
                    <label>Target Average (Optional)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        value={targetAverage}
                        onChange={(e) => setTargetAverage(e.target.value)}
                        placeholder="e.g., 80"
                        min="0"
                        max="100"
                      />
                      <span className="input-unit">/100</span>
                    </div>
                  </div>
                  
                  <div className="setting">
                    <label>Global KKM</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        value={globalKKM}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 75;
                          setGlobalKKM(value);
                          if (useGlobalKKM) {
                            setSubjects(subjects.map(s => ({ ...s, kkm: value })));
                          }
                        }}
                        min="0"
                        max="100"
                      />
                      <span className="input-unit">/100</span>
                    </div>
                    <div className="checkbox-container">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={useGlobalKKM}
                          onChange={() => {
                            const newValue = !useGlobalKKM;
                            setUseGlobalKKM(newValue);
                            if (newValue) {
                              setSubjects(subjects.map(s => ({ ...s, kkm: globalKKM })));
                            }
                          }}
                        />
                        <span className="checkbox-custom"></span>
                        Use Global KKM
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-card stats-card">
                <h3><span>📈</span> Quick Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-label">Subjects</div>
                    <div className="stat-value">{subjects.length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">With Scores</div>
                    <div className="stat-value">
                      {subjects.filter(s => s.score && !isNaN(parseFloat(s.score))).length}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Avg KKM</div>
                    <div className="stat-value">
                      {Math.round(subjects.reduce((a, b) => a + b.kkm, 0) / subjects.length)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Table */}
            <div className="table-panel">
              <div className="panel-header">
                <h2><span>📚</span> Subjects & Scores</h2>
                <div className="panel-actions">
                  <button 
                    className="btn-add"
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
                    <span>➕</span> Add Subject
                  </button>
                  <button 
                    className="btn-clear"
                    onClick={() => {
                      if (window.confirm('Clear all subject data?')) {
                        setSubjects(subjects.map(s => ({ ...s, score: '' })));
                      }
                    }}
                  >
                    <span>🗑️</span> Clear Scores
                  </button>
                </div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th className="col-subject">Subject Name</th>
                      <th className="col-score">Score</th>
                      <th className="col-kkm">KKM</th>
                      <th className="col-status">Status</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => {
                      const scoreValue = parseFloat(subject.score) || 0;
                      const isPassed = !isNaN(scoreValue) && scoreValue >= subject.kkm;
                      
                      return (
                        <tr key={subject.id} className={index % 2 === 0 ? 'even' : 'odd'}>
                          <td>
                            <input
                              type="text"
                              value={subject.name}
                              onChange={(e) => {
                                const newSubjects = [...subjects];
                                newSubjects[index].name = e.target.value;
                                setSubjects(newSubjects);
                              }}
                              className="subject-name-input"
                              placeholder="Enter subject name"
                            />
                          </td>
                          <td>
                            <div className="score-input-container">
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
                                step="0.1"
                                className="score-input"
                                placeholder="0-100"
                              />
                              <span className="score-suffix">/100</span>
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
                              className={`kkm-input ${useGlobalKKM ? 'disabled' : ''}`}
                              disabled={useGlobalKKM}
                            />
                          </td>
                          <td>
                            <div className={`status-indicator ${subject.score ? (isPassed ? 'passed' : 'failed') : 'empty'}`}>
                              <span className="status-dot"></span>
                              <span className="status-text">
                                {subject.score ? (isPassed ? 'PASS' : 'FAIL') : 'NO DATA'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  if (subjects.length > 1) {
                                    setSubjects(subjects.filter(s => s.id !== subject.id));
                                  }
                                }}
                                title="Delete subject"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="calculate-section">
              <button 
                className="btn-calculate"
                onClick={() => results && setActiveTab('results')}
                disabled={!results}
              >
                <span>🧮</span>
                Calculate & View Results
                <span>→</span>
              </button>
              {!results && (
                <p className="calculate-hint">Enter scores in at least one subject to calculate results</p>
              )}
            </div>
          </>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && results && (
          <div className="results-panel">
            {/* Results Summary */}
            <div className="results-summary">
              <div className="summary-card main-summary">
                <div className="summary-icon">📊</div>
                <div className="summary-content">
                  <div className="summary-label">Overall Average</div>
                  <div className="summary-value">{results.average}<span>/100</span></div>
                  <div className="summary-sub">Based on {results.total} subjects</div>
                </div>
              </div>

              <div className="summary-grid">
                <div className="summary-card">
                  <div className="summary-icon">✅</div>
                  <div className="summary-content">
                    <div className="summary-label">Passed Subjects</div>
                    <div className="summary-value">{results.passed}<span>/{results.total}</span></div>
                    <div className="summary-sub">{((results.passed/results.total)*100).toFixed(0)}% success rate</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">📈</div>
                  <div className="summary-content">
                    <div className="summary-label">Highest Score</div>
                    <div className="summary-value">{results.highest}<span>/100</span></div>
                    <div className="summary-sub">Best performance</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">📉</div>
                  <div className="summary-content">
                    <div className="summary-label">Lowest Score</div>
                    <div className="summary-value">{results.lowest}<span>/100</span></div>
                    <div className="summary-sub">Needs improvement</div>
                  </div>
                </div>

                {targetAverage && (
                  <div className="summary-card">
                    <div className="summary-icon">🎯</div>
                    <div className="summary-content">
                      <div className="summary-label">Target Difference</div>
                      <div className={`summary-value ${parseFloat(results.average) >= parseFloat(targetAverage) ? 'positive' : 'negative'}`}>
                        {parseFloat(results.average) >= parseFloat(targetAverage) ? '+' : ''}
                        {(parseFloat(results.average) - parseFloat(targetAverage)).toFixed(1)}
                      </div>
                      <div className="summary-sub">Target: {targetAverage}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="analysis-panel">
              <h3><span>🔍</span> Detailed Subject Analysis</h3>
              <div className="analysis-grid">
                {results.validSubjects.map((subject) => {
                  const score = parseFloat(subject.score);
                  const percentage = (score / 100) * 100;
                  const kkmPercentage = (subject.kkm / 100) * 100;
                  const isPassed = score >= subject.kkm;
                  const difference = score - subject.kkm;
                  
                  return (
                    <div key={subject.id} className="analysis-card">
                      <div className="analysis-header">
                        <h4>{subject.name}</h4>
                        <div className={`score-badge ${isPassed ? 'passed' : 'failed'}`}>
                          {score}/100
                        </div>
                      </div>
                      
                      <div className="progress-container">
                        <div className="progress-labels">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className={`progress-fill ${isPassed ? 'fill-passed' : 'fill-failed'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <div 
                            className="kkm-marker"
                            style={{ left: `${kkmPercentage}%` }}
                            title={`KKM: ${subject.kkm}`}
                          ></div>
                        </div>
                        <div className="progress-info">
                          <span className="kkm-label">KKM: {subject.kkm}</span>
                          <span className={`difference ${difference >= 0 ? 'positive' : 'negative'}`}>
                            {difference >= 0 ? '+' : ''}{difference.toFixed(1)} points
                          </span>
                        </div>
                      </div>
                      
                      <div className="analysis-footer">
                        <div className="grade-circle">
                          <div className="circle-value">{score}</div>
                          <div className="circle-label">Score</div>
                        </div>
                        <div className="status-display">
                          <div className={`status ${isPassed ? 'status-passed' : 'status-failed'}`}>
                            {isPassed ? '✓ PASSED' : '✗ NEEDS IMPROVEMENT'}
                          </div>
                          <div className="recommendation">
                            {isPassed ? 
                              'Keep up the good work!' : 
                              `Focus needed to reach KKM (${subject.kkm})`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="export-panel">
            <div className="export-header">
              <h2><span>💾</span> Export Options</h2>
              <p>Download your analysis in different formats</p>
            </div>
            
            <div className="export-options">
              <div className="export-card">
                <div className="export-icon">📄</div>
                <h3>JSON Export</h3>
                <p>Complete data structure for backup or further processing</p>
                <button 
                  className="export-btn"
                  onClick={() => {
                    const data = {
                      subjects,
                      targetAverage,
                      globalKKM,
                      useGlobalKKM,
                      results,
                      timestamp: new Date().toISOString()
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `grade-analysis-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                  }}
                >
                  Download JSON
                </button>
              </div>

              <div className="export-card">
                <div className="export-icon">📊</div>
                <h3>CSV Export</h3>
                <p>Spreadsheet format for Excel or Google Sheets</p>
                <button 
                  className="export-btn"
                  onClick={() => {
                    const csvContent = [
                      ['Subject', 'Score', 'KKM', 'Status', 'Difference'],
                      ...subjects
                        .filter(s => s.score && !isNaN(parseFloat(s.score)))
                        .map(s => [
                          s.name,
                          parseFloat(s.score),
                          s.kkm,
                          parseFloat(s.score) >= s.kkm ? 'PASS' : 'FAIL',
                          parseFloat(s.score) - s.kkm
                        ])
                    ].map(row => row.join(',')).join('\n');
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `grades-${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                  }}
                >
                  Download CSV
                </button>
              </div>

              <div className="export-card">
                <div className="export-icon">🖨️</div>
                <h3>Print Report</h3>
                <p>Printer-friendly formatted report</p>
                <button 
                  className="export-btn"
                  onClick={() => window.print()}
                >
                  Print Now
                </button>
              </div>
            </div>

            <div className="export-notes">
              <h4>📝 Notes</h4>
              <ul>
                <li>Data is automatically saved to your browser's local storage</li>
                <li>Exported files contain timestamp for reference</li>
                <li>Print function works best with Chrome or Firefox</li>
                <li>Your data never leaves your device</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span>📊</span>
              <div>
                <h4>Grade Calculator Pro</h4>
                <p>Professional Academic Analysis</p>
              </div>
            </div>
            <p className="copyright">© 2025 • All rights reserved</p>
          </div>
          
          <div className="footer-section">
            <div className="thanks-section">
              <p className="thanks-title">Thanks to:</p>
              <div className="thanks-items">
                <span className="thanks-item">🤖 AI DeepSeek</span>
                <span className="thanks-item">👨‍🏫 Teachers</span>
                <span className="thanks-item">🙏 God</span>
                <span className="thanks-item">🎭 Me: 蕭Ga</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;