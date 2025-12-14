import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, Area, AreaChart
} from 'recharts';

const StatsVisualization = ({ data }) => {
  const barChartData = data.subjects.map(subject => ({
    name: subject.name.length > 10 ? subject.name.substring(0, 10) + '...' : subject.name,
    nilai: subject.score,
    kkm: subject.kkm,
    selisih: subject.score - subject.kkm
  }));

  const passFailData = [
    { name: 'Tuntas', value: data.passedCount, color: '#10b981' },
    { name: 'Remedial', value: data.subjectCount - data.passedCount, color: '#ef4444' }
  ];

  const gradeDistribution = [
    { name: 'A (≥85)', value: data.subjects.filter(s => s.score >= 85).length },
    { name: `B+ (KKM+15)`, value: data.subjects.filter(s => s.score >= s.kkm + 15 && s.score < 85).length },
    { name: `B (≥KKM)`, value: data.subjects.filter(s => s.score >= s.kkm && s.score < s.kkm + 15).length },
    { name: `C (<KKM)`, value: data.subjects.filter(s => s.score < s.kkm && s.score >= s.kkm - 10).length },
    { name: 'D (Remedial)', value: data.subjects.filter(s => s.score < s.kkm - 10).length }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'];

  const areaChartData = data.subjects.map((subject, index) => ({
    index: index + 1,
    name: subject.name,
    nilai: subject.score,
    kkm: subject.kkm
  }));

  return (
    <div className="visualization-container glass-card">
      <h2 className="viz-title">
        <span className="viz-icon">📊</span>
        Visualisasi Data & Statistik
      </h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Perbandingan Nilai vs KKM</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'nilai') return [`${value}`, 'Nilai'];
                  if (name === 'kkm') return [`${value}`, 'KKM'];
                  if (name === 'selisih') return [`${value > 0 ? '+' : ''}${value}`, 'Selisih'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                dataKey="nilai" 
                name="Nilai" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="kkm" 
                name="KKM" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Status Ketuntasan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={passFailData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {passFailData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} mata pelajaran`, 'Jumlah']}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-stats">
            <div className="pie-stat">
              <div className="pie-stat-label">Tuntas</div>
              <div className="pie-stat-value">{data.passedCount}</div>
            </div>
            <div className="pie-stat">
              <div className="pie-stat-label">Remedial</div>
              <div className="pie-stat-value">{data.subjectCount - data.passedCount}</div>
            </div>
            <div className="pie-stat">
              <div className="pie-stat-label">Persentase</div>
              <div className="pie-stat-value">{data.passPercentage.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <h3 className="chart-title">Distribusi Nilai Berurutan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="index" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'nilai') return [`${value}`, 'Nilai'];
                  if (name === 'kkm') return [`${value}`, 'KKM'];
                  return [value, name];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="nilai" 
                name="Nilai" 
                stroke="#8884d8" 
                fill="url(#colorNilai)" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="kkm" 
                name="KKM" 
                stroke="#82ca9d" 
                fill="url(#colorKKM)" 
                fillOpacity={0.3}
              />
              <defs>
                <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorKKM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-summary">
        <h3 className="summary-title">Ringkasan Statistik</h3>
        <div className="stats-grid-mini">
          <div className="stat-card">
            <div className="stat-card-icon">📈</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{data.calculatedAverage.toFixed(2)}</div>
              <div className="stat-card-label">Rata-Rata Nilai</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">⚖️</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{data.standardDeviation.toFixed(2)}</div>
              <div className="stat-card-label">Standar Deviasi</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">🎯</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{data.passPercentage.toFixed(1)}%</div>
              <div className="stat-card-label">Tingkat Ketuntasan</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">📏</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{data.range.toFixed(1)}</div>
              <div className="stat-card-label">Rentang Nilai</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">📊</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{gradeDistribution[0].value}</div>
              <div className="stat-card-label">Nilai A</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">⚠️</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{gradeDistribution[4].value}</div>
              <div className="stat-card-label">Perlu Remedial</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsVisualization;