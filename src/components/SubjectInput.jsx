import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SubjectInput = ({ 
  subjects, 
  onSubjectChange, 
  onAddSubject, 
  onDeleteSubject,
  useGlobalKKM,
  globalKKM 
}) => {
  return (
    <div className="subjects-container glass-card">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">📚</span>
          Data Mata Pelajaran & Nilai
        </h2>
        <p className="section-subtitle">
          Masukkan nilai dan KKM untuk setiap mata pelajaran. {useGlobalKKM && `KKM Global: ${globalKKM}`}
        </p>
      </div>

      <div className="table-header">
        <div className="header-cell index">#</div>
        <div className="header-cell name">Mata Pelajaran</div>
        <div className="header-cell score">Nilai</div>
        <div className="header-cell kkm">KKM</div>
        <div className="header-cell actions">Aksi</div>
      </div>

      <div className="subjects-list">
        <AnimatePresence>
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="subject-row"
            >
              <div className="cell index">
                <div className="index-badge">{index + 1}</div>
              </div>
              
              <div className="cell name">
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => onSubjectChange(subject.id, 'name', e.target.value)}
                  placeholder="Nama mata pelajaran"
                  className="styled-input subject-name-input"
                  required
                />
              </div>
              
              <div className="cell score">
                <div className="input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={subject.score}
                    onChange={(e) => onSubjectChange(subject.id, 'score', e.target.value)}
                    placeholder="0-100"
                    className="styled-input score-input"
                    required
                  />
                  <span className="input-hint">/100</span>
                </div>
              </div>
              
              <div className="cell kkm">
                <div className="input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={subject.kkm}
                    onChange={(e) => onSubjectChange(subject.id, 'kkm', parseInt(e.target.value) || 75)}
                    placeholder="KKM"
                    className="styled-input kkm-input"
                    disabled={useGlobalKKM}
                    style={{ 
                      opacity: useGlobalKKM ? 0.6 : 1,
                      cursor: useGlobalKKM ? 'not-allowed' : 'text'
                    }}
                  />
                  <span className="input-hint">/100</span>
                </div>
                {useGlobalKKM && (
                  <div className="kkm-global-badge">Global</div>
                )}
              </div>
              
              <div className="cell actions">
                <button
                  onClick={() => onDeleteSubject(subject.id)}
                  className="btn-delete"
                  aria-label="Hapus mata pelajaran"
                  title="Hapus mata pelajaran"
                >
                  <span className="delete-icon">🗑️</span>
                  <span className="delete-text">Hapus</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="subjects-footer">
        <button
          onClick={onAddSubject}
          className="btn-add-subject"
        >
          <span className="add-icon">➕</span>
          Tambah Mata Pelajaran Baru
        </button>
        
        <div className="subjects-stats">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{subjects.length} mapel</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Dengan nilai:</span>
            <span className="stat-value">
              {subjects.filter(s => s.score !== '' && !isNaN(parseFloat(s.score))).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectInput;