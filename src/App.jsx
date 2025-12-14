import React, { useState, useEffect } from 'react';
import SubjectInput from './components/SubjectInput';
import ResultsDisplay from './components/ResultsDisplay';
import StatsVisualization from './components/StatsVisualization';
import { calculateStatistics, validateInput } from './utils/calculations';

const DEFAULT_SUBJECTS = [
  { id: 1, name: 'Matematika', score: '', kkm: 75 },
  { id: 2, name: 'Bahasa Indonesia', score: '', kkm: 75 },
  { id: 3, name: 'Bahasa Inggris', score: '', kkm: 75 },
  { id: 4, name: 'Fisika', score: '', kkm: 70 },
  { id: 5, name: 'Kimia', score: '', kkm: 70 },
  { id: 6, name: 'Biologi', score: '', kkm: 70 },
  { id: 7, name: 'Sejarah', score: '', kkm: 72 },
  { id: 8, name: 'Geografi', score: '', kkm: 72 },
  { id: 9, name: 'Seni Budaya', score: '', kkm: 70 },
  { id: 10, name: 'PJOK', score: '', kkm: 70 }
];

const App = () => {
  const [targetAverage, setTargetAverage] = useState('');
  const [globalKKM, setGlobalKKM] = useState(75);
  const [useGlobalKKM, setUseGlobalKKM] = useState(true);
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleCalculate = () => {
    const subjectsWithKkm = subjects.map(subject => ({
      ...subject,
      kkm: useGlobalKKM ? globalKKM : subject.kkm
    }));

    const validationErrors = validateInput(subjectsWithKkm, targetAverage);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors([]), 5000);
      return;
    }

    const stats = calculateStatistics(subjectsWithKkm, targetAverage);
    setResults(stats);
    
    localStorage.setItem('lastCalculationKKM', JSON.stringify({
      targetAverage,
      globalKKM,
      useGlobalKKM,
      subjects: subjectsWithKkm,
      results: stats,
      timestamp: new Date().toISOString()
    }));
  };

  const handleReset = () => {
    setTargetAverage('');
    setGlobalKKM(75);
    setUseGlobalKKM(true);
    setSubjects(DEFAULT_SUBJECTS);
    setResults(null);
    setErrors([]);
  };

  const handleAddSubject = () => {
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    setSubjects([
      ...subjects, 
      { 
        id: newId, 
        name: `Mata Pelajaran ${newId}`, 
        score: '', 
        kkm: globalKKM 
      }
    ]);
  };

  const handleDeleteSubject = (id) => {
    if (subjects.length <= 1) {
      setErrors(['Minimal harus ada satu mata pelajaran']);
      return;
    }
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const handleGlobalKKMToggle = () => {
    setUseGlobalKKM(!useGlobalKKM);
    if (!useGlobalKKM) {
      setSubjects(subjects.map(subject => ({
        ...subject,
        kkm: globalKKM
      })));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('lastCalculationKKM');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.timestamp && Date.now() - new Date(data.timestamp).getTime() < 86400000) {
          setTargetAverage(data.targetAverage || '');
          setGlobalKKM(data.globalKKM || 75);
          setUseGlobalKKM(data.useGlobalKKM !== undefined ? data.useGlobalKKM : true);
          setSubjects(data.subjects || DEFAULT_SUBJECTS);
          setResults(data.results || null);
        }
      } catch (err) {
        console.error('Error loading saved data:', err);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="title-gradient">🏫 KALKULATOR NILAI PRO + KKM</h1>
          <p className="subtitle">Sistem Analisis Nilai Akademik dengan Kriteria Ketuntasan Minimal</p>
          <div className="version-badge">v3.0 • Dengan Perhitungan KKM • React 18</div>
        </div>
      </header>

      <main className="main-content">
        {errors.length > 0 && (
          <div className="error-container pulse-animation">
            {errors.map((error, idx) => (
              <div key={idx} className="error-message">⚠️ {error}</div>
            ))}
          </div>
        )}

        <div className="settings-section glass-card">
          <div className="settings-grid">
            <div className="setting-group">
              <label htmlFor="targetAverage" className="setting-label">
                <span className="label-icon">🎯</span>
                <span className="label-text">
                  Target Rata-Rata
                  <span className="label-hint">(Opsional)</span>
                </span>
              </label>
              <div className="input-with-unit">
                <input
                  type="number"
                  id="targetAverage"
                  min="0"
                  max="100"
                  step="0.1"
                  value={targetAverage}
                  onChange={(e) => setTargetAverage(e.target.value)}
                  placeholder="Contoh: 80.5"
                  className="styled-input"
                />
                <span className="input-unit">/100</span>
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <span className="label-icon">📏</span>
                <span className="label-text">
                  KKM Global
                  <span className="label-hint">(Kriteria Ketuntasan Minimal)</span>
                </span>
              </label>
              <div className="kkm-controls">
                <div className="input-with-unit">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={globalKKM}
                    onChange={(e) => {
                      const newKKM = parseInt(e.target.value) || 75;
                      setGlobalKKM(newKKM);
                      if (useGlobalKKM) {
                        setSubjects(subjects.map(subject => ({
                          ...subject,
                          kkm: newKKM
                        })));
                      }
                    }}
                    className="styled-input"
                    disabled={!useGlobalKKM}
                  />
                  <span className="input-unit">/100</span>
                </div>
                <div className="toggle-group">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={useGlobalKKM}
                      onChange={handleGlobalKKMToggle}
                      className="toggle-checkbox"
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">
                      {useGlobalKKM ? 'KKM Global Aktif' : 'KKM Individual'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SubjectInput
          subjects={subjects}
          onSubjectChange={handleSubjectChange}
          onAddSubject={handleAddSubject}
          onDeleteSubject={handleDeleteSubject}
          useGlobalKKM={useGlobalKKM}
          globalKKM={globalKKM}
        />

        <div className="action-section">
          <div className="button-group">
            <button 
              onClick={handleCalculate}
              className="btn-calculate shimmer-effect"
            >
              <span className="btn-icon">🧮</span>
              <span className="btn-text">Hitung Analisis Lengkap</span>
            </button>
            <button 
              onClick={handleReset}
              className="btn-reset"
            >
              <span className="btn-icon">🔄</span>
              <span className="btn-text">Reset Semua</span>
            </button>
          </div>
          
          <div className="stats-preview">
            <div className="preview-item">
              <span className="preview-label">Total Mapel:</span>
              <span className="preview-value">{subjects.length}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">KKM Aktif:</span>
              <span className="preview-value">{useGlobalKKM ? `${globalKKM} (Global)` : 'Individual'}</span>
            </div>
          </div>
        </div>

        {results && (
          <>
            <ResultsDisplay results={results} />
            <StatsVisualization data={results} />
            
            <div className="export-section glass-card">
              <h3 className="export-title">
                <span className="export-icon">📤</span>
                Ekspor Hasil Analisis
              </h3>
              <div className="export-buttons">
                <button 
                  onClick={() => window.print()}
                  className="btn-export"
                >
                  <span className="export-btn-icon">🖨️</span>
                  Cetak Laporan
                </button>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(results, null, 2);
                    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                    const link = document.createElement('a');
                    link.setAttribute('href', dataUri);
                    link.setAttribute('download', `hasil-nilai-kkm-${new Date().toISOString().split('T')[0]}.json`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="btn-export"
                >
                  <span className="export-btn-icon">💾</span>
                  Download JSON
                </button>
                <button 
                  onClick={() => {
                    const csvContent = [
                      ['Mata Pelajaran', 'Nilai', 'KKM', 'Status', 'Selisih'],
                      ...results.subjects.map(s => [
                        s.name,
                        s.score.toFixed(1),
                        s.kkm,
                        s.score >= s.kkm ? 'Tuntas' : 'Remedial',
                        (s.score - s.kkm).toFixed(1)
                      ])
                    ].map(row => row.join(',')).join('\n');
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `nilai-kkm-${new Date().toISOString().split('T')[0]}.csv`;
                    link.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="btn-export"
                >
                  <span className="export-btn-icon">📊</span>
                  Download CSV
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-section">
              <h4 className="footer-heading">ℹ️ Tentang Sistem</h4>
              <p className="footer-text">
                Sistem ini menggunakan algoritma <strong>Weighted Average</strong> dengan 
                koreksi KKM. Perhitungan meliputi rata-rata, standar deviasi, dan analisis ketuntasan.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">⚠️ Catatan Penting</h4>
              <p className="footer-text">
                Hasil perhitungan bersifat statistik dan referensi. 
                Konsultasikan dengan guru untuk keputusan akademik akhir.
              </p>
            </div>
          </div>
          
          <div className="tech-stack">
            <div className="tech-label">Dibangun dengan:</div>
            <div className="tech-badges">
              <span className="tech-badge">React 18</span>
              <span className="tech-badge">Framer Motion</span>
              <span className="tech-badge">Recharts</span>
              <span className="tech-badge">CSS Grid</span>
              <span className="tech-badge">Vercel Ready</span>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">
              © 2024 Grade Calculator Pro + KKM • v3.0 • Sistem Analisis Nilai Akademik
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;