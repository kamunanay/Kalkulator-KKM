import React from 'react';
import { motion } from 'framer-motion';

const ResultsDisplay = ({ results }) => {
  const getGradeColor = (score, kkm) => {
    if (score >= 85) return 'grade-a';
    if (score >= kkm + 15) return 'grade-b-plus';
    if (score >= kkm) return 'grade-b';
    if (score >= kkm - 10) return 'grade-c';
    return 'grade-d';
  };

  const getStatusIcon = (score, kkm) => {
    if (score >= kkm + 20) return '🏆';
    if (score >= kkm + 10) return '⭐';
    if (score >= kkm) return '✅';
    if (score >= kkm - 5) return '⚠️';
    return '❌';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="results-container glass-card"
    >
      <div className="results-header">
        <h2 className="results-title">
          <span className="title-icon">📈</span>
          HASIL ANALISIS KOMPREHENSIF
        </h2>
        <div className="results-timestamp">
          Terhitung pada: {new Date(results.timestamp).toLocaleString('id-ID')}
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card primary">
          <div className="card-icon">🧮</div>
          <div className="card-content">
            <h3 className="card-title">Rata-Rata Nilai</h3>
            <div className="card-value">{results.calculatedAverage.toFixed(2)}</div>
            <div className="card-subtitle">
              dari {results.subjectCount} mata pelajaran
            </div>
            <div className="card-detail">
              <span className="detail-item">
                <span className="detail-label">Nilai Total:</span>
                <span className="detail-value">{results.totalScore.toFixed(1)}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="summary-card kkm">
          <div className="card-icon">📏</div>
          <div className="card-content">
            <h3 className="card-title">Analisis KKM</h3>
            <div className="card-value">{results.passedCount}/{results.subjectCount}</div>
            <div className="card-subtitle">Mata pelajaran tuntas</div>
            <div className="card-detail">
              <span className="detail-item">
                <span className="detail-label">Tingkat Ketuntasan:</span>
                <span className="detail-value">{results.passPercentage.toFixed(1)}%</span>
              </span>
            </div>
          </div>
        </div>

        {results.targetAverage && (
          <div className="summary-card target">
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h3 className="card-title">Target Rata-Rata</h3>
              <div className="card-value">{parseFloat(results.targetAverage).toFixed(2)}</div>
              <div className="card-subtitle">
                {results.difference >= 0 ? 'Target tercapai!' : 'Target belum tercapai'}
              </div>
              <div className={`card-detail ${results.difference >= 0 ? 'positive' : 'negative'}`}>
                <span className="detail-item">
                  <span className="detail-label">Selisih:</span>
                  <span className="detail-value">
                    {results.difference >= 0 ? '+' : ''}{results.difference.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="summary-card stats">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3 className="card-title">Statistik Nilai</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{results.highestScore.toFixed(1)}</div>
                <div className="stat-label">Tertinggi</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{results.lowestScore.toFixed(1)}</div>
                <div className="stat-label">Terendah</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{results.standardDeviation.toFixed(2)}</div>
                <div className="stat-label">Std Dev</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{results.range.toFixed(1)}</div>
                <div className="stat-label">Rentang</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-results">
        <h3 className="detailed-title">
          <span className="detailed-icon">🔍</span>
          Detail Nilai per Mata Pelajaran
        </h3>
        
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th className="th-index">No</th>
                <th className="th-subject">Mata Pelajaran</th>
                <th className="th-score">Nilai</th>
                <th className="th-kkm">KKM</th>
                <th className="th-difference">Selisih</th>
                <th className="th-status">Status</th>
                <th className="th-category">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {results.subjects.map((subject, index) => {
                const difference = subject.score - subject.kkm;
                const isPassed = subject.score >= subject.kkm;
                
                return (
                  <tr key={subject.id} className={isPassed ? 'row-passed' : 'row-failed'}>
                    <td className="td-index">
                      <div className="index-circle">{index + 1}</div>
                    </td>
                    <td className="td-subject">
                      <div className="subject-name">{subject.name}</div>
                    </td>
                    <td className="td-score">
                      <span className={`score-badge ${getGradeColor(subject.score, subject.kkm)}`}>
                        {subject.score.toFixed(1)}
                      </span>
                    </td>
                    <td className="td-kkm">
                      <span className="kkm-badge">{subject.kkm}</span>
                    </td>
                    <td className="td-difference">
                      <span className={`difference-badge ${difference >= 0 ? 'diff-positive' : 'diff-negative'}`}>
                        {difference >= 0 ? '+' : ''}{difference.toFixed(1)}
                      </span>
                    </td>
                    <td className="td-status">
                      <div className="status-container">
                        <span className="status-icon">{getStatusIcon(subject.score, subject.kkm)}</span>
                        <span className={`status-text ${isPassed ? 'status-passed' : 'status-failed'}`}>
                          {isPassed ? 'TUNTAS' : 'REMEDIAL'}
                        </span>
                      </div>
                    </td>
                    <td className="td-category">
                      {subject.score >= 85 ? 'A (Sangat Baik)' :
                       subject.score >= subject.kkm + 15 ? 'B+ (Baik Sekali)' :
                       subject.score >= subject.kkm ? 'B (Baik)' :
                       subject.score >= subject.kkm - 10 ? 'C (Cukup)' : 
                       'D (Perlu Remedial)'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="analysis-section">
        <h4 className="analysis-title">
          <span className="analysis-icon">📝</span>
          Analisis & Rekomendasi
        </h4>
        <div className="analysis-content">
          <p className="analysis-text">{results.analysisNote}</p>
          
          <div className="recommendations">
            <h5 className="recommendations-title">Rekomendasi:</h5>
            <ul className="recommendations-list">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="recommendation-item">
                  <span className="rec-icon">👉</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;