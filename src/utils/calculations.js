/**
 * Utility functions untuk perhitungan statistik nilai dengan KKM
 */

export const validateInput = (subjects, targetAverage) => {
  const errors = [];
  
  subjects.forEach((subject, index) => {
    if (!subject.name.trim()) {
      errors.push(`Nama mata pelajaran #${index + 1} tidak boleh kosong`);
    }
    
    const score = parseFloat(subject.score);
    if (isNaN(score)) {
      errors.push(`Nilai untuk "${subject.name}" harus berupa angka`);
    } else if (score < 0 || score > 100) {
      errors.push(`Nilai untuk "${subject.name}" harus antara 0-100`);
    }
    
    const kkm = parseInt(subject.kkm) || 75;
    if (kkm < 0 || kkm > 100) {
      errors.push(`KKM untuk "${subject.name}" harus antara 0-100`);
    }
  });

  if (targetAverage && targetAverage.trim() !== '') {
    const target = parseFloat(targetAverage);
    if (isNaN(target)) {
      errors.push('Target rata-rata harus berupa angka');
    } else if (target < 0 || target > 100) {
      errors.push('Target rata-rata harus antara 0-100');
    }
  }

  return errors;
};

export const calculateStatistics = (subjects, targetAverage) => {
  const validSubjects = subjects
    .map(subject => ({
      ...subject,
      score: parseFloat(subject.score) || 0,
      kkm: parseInt(subject.kkm) || 75
    }))
    .filter(subject => !isNaN(subject.score));

  const scores = validSubjects.map(s => s.score);
  const kkms = validSubjects.map(s => s.kkm);
  const subjectCount = scores.length;

  if (subjectCount === 0) {
    return {
      calculatedAverage: 0,
      targetAverage: targetAverage || null,
      difference: 0,
      highestScore: 0,
      lowestScore: 0,
      standardDeviation: 0,
      subjectCount: 0,
      totalScore: 0,
      passedCount: 0,
      passPercentage: 0,
      range: 0,
      subjects: [],
      analysisNote: "Tidak ada data nilai yang valid untuk dianalisis.",
      recommendations: [
        "Masukkan nilai untuk minimal satu mata pelajaran",
        "Pastikan format nilai benar (angka 0-100)"
      ],
      timestamp: new Date().toISOString()
    };
  }

  const sum = scores.reduce((acc, score) => acc + score, 0);
  const calculatedAverage = sum / subjectCount;
  const totalScore = sum;

  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const range = highestScore - lowestScore;

  const variance = scores.reduce((acc, score) => 
    acc + Math.pow(score - calculatedAverage, 2), 0) / subjectCount;
  const standardDeviation = Math.sqrt(variance);

  const passedSubjects = validSubjects.filter(subject => subject.score >= subject.kkm);
  const passedCount = passedSubjects.length;
  const passPercentage = (passedCount / subjectCount) * 100;

  const target = targetAverage ? parseFloat(targetAverage) : null;
  const difference = target ? calculatedAverage - target : 0;

  const { analysisNote, recommendations } = generateAnalysis({
    average: calculatedAverage,
    target,
    difference,
    highestScore,
    lowestScore,
    standardDeviation,
    subjectCount,
    passedCount,
    passPercentage,
    range,
    subjects: validSubjects
  });

  return {
    calculatedAverage,
    targetAverage: target,
    difference,
    highestScore,
    lowestScore,
    standardDeviation,
    subjectCount,
    totalScore,
    passedCount,
    passPercentage,
    range,
    subjects: validSubjects,
    analysisNote,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

const generateAnalysis = (stats) => {
  let analysisNote = "";
  const recommendations = [];

  // Analisis rata-rata
  if (stats.average >= 85) {
    analysisNote += "PERFORMA LUAR BIASA! Rata-rata nilai berada di kategori A (Sangat Baik). ";
    recommendations.push("Pertahankan konsistensi dan fokus pada pengembangan diri");
  } else if (stats.average >= 75) {
    analysisNote += "Performa BAIK. Rata-rata nilai memenuhi standar KKM umum. ";
    recommendations.push("Identifikasi mata pelajaran dengan nilai terendah untuk ditingkatkan");
  } else if (stats.average >= 65) {
    analysisNote += "Performa CUKUP. Beberapa mata pelajaran mungkin memerlukan perhatian khusus. ";
    recommendations.push("Fokus pada mata pelajaran dengan selisih negatif terbesar terhadap KKM");
  } else {
    analysisNote += "Perlu PERBAIKAN SIGNIFIKAN. Rata-rata nilai di bawah standar minimum. ";
    recommendations.push("Konsultasikan dengan guru untuk rencana belajar intensif");
  }

  // Analisis ketuntasan
  if (stats.passPercentage >= 90) {
    analysisNote += `TINGKAT KETUNTASAN SANGAT TINGGI (${stats.passPercentage.toFixed(1)}%). `;
    recommendations.push("Pertahankan fokus pada seluruh mata pelajaran");
  } else if (stats.passPercentage >= 70) {
    analysisNote += `Tingkat ketuntasan MEMADAI (${stats.passPercentage.toFixed(1)}%). `;
    recommendations.push(`Tingkatkan ${stats.subjectCount - stats.passedCount} mata pelajaran yang belum tuntas`);
  } else {
    analysisNote += `TINGKAT KETUNTASAN RENDAH (${stats.passPercentage.toFixed(1)}%). `;
    recommendations.push(`Prioritaskan ${stats.subjectCount - stats.passedCount} mata pelajaran remedial`);
  }

  // Analisis konsistensi
  if (stats.standardDeviation > 15) {
    analysisNote += "VARIASI NILAI TINGGI: Terdapat perbedaan signifikan antar mata pelajaran. ";
    recommendations.push("Seimbangkan waktu belajar untuk semua mata pelajaran");
  } else if (stats.standardDeviation < 5) {
    analysisNote += "KONSISTENSI BAIK: Nilai tersebar merata di semua bidang. ";
    recommendations.push("Pertahankan keseimbangan belajar yang baik");
  }

  // Analisis target
  if (stats.target) {
    if (stats.difference >= 5) {
      analysisNote += `TARGET TERLAMPAUI! Melebihi target sebesar ${stats.difference.toFixed(1)} poin. `;
      recommendations.push("Tetapkan target yang lebih tinggi untuk motivasi tambahan");
    } else if (stats.difference >= 0) {
      analysisNote += `Target tercapai dengan selisih ${stats.difference.toFixed(1)} poin. `;
      recommendations.push("Pertahankan dan sedikit tingkatkan target berikutnya");
    } else {
      analysisNote += `Target belum tercapai. Kurang ${Math.abs(stats.difference).toFixed(1)} poin. `;
      recommendations.push("Evaluasi strategi belajar untuk mencapai target");
    }
  }

  // Analisis rentang
  if (stats.range > 40) {
    analysisNote += "RENTANG NILAI SANGAT LEBAR: Perbedaan antara nilai tertinggi dan terendah signifikan. ";
    recommendations.push("Fokus pada mata pelajaran dengan nilai terendah");
  }

  // Rekomendasi tambahan
  const failedSubjects = stats.subjects.filter(s => s.score < s.kkm);
  if (failedSubjects.length > 0) {
    recommendations.push(`Prioritaskan remedial untuk: ${failedSubjects.slice(0, 3).map(s => s.name).join(', ')}`);
  }

  const excellentSubjects = stats.subjects.filter(s => s.score >= 90);
  if (excellentSubjects.length > 0) {
    recommendations.push(`Pertahankan keunggulan di: ${excellentSubjects.slice(0, 3).map(s => s.name).join(', ')}`);
  }

  return { analysisNote, recommendations };
};