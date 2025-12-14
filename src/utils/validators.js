/**
 * Validator functions untuk input data
 */

export const isValidScore = (score) => {
  const num = parseFloat(score);
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const isValidKKM = (kkm) => {
  const num = parseInt(kkm);
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const isValidSubjectName = (name) => {
  return name && name.trim().length > 0 && name.trim().length <= 50;
};

export const formatScore = (score) => {
  const num = parseFloat(score);
  return !isNaN(num) ? num.toFixed(1) : '';
};

export const formatKKM = (kkm) => {
  const num = parseInt(kkm);
  return !isNaN(num) ? num.toString() : '';
};

export const validateAllSubjects = (subjects) => {
  const errors = [];
  
  subjects.forEach((subject, index) => {
    if (!isValidSubjectName(subject.name)) {
      errors.push({
        index,
        field: 'name',
        message: `Nama mata pelajaran #${index + 1} tidak valid`
      });
    }
    
    if (!isValidScore(subject.score)) {
      errors.push({
        index,
        field: 'score',
        message: `Nilai untuk "${subject.name}" harus antara 0-100`
      });
    }
    
    if (!isValidKKM(subject.kkm)) {
      errors.push({
        index,
        field: 'kkm',
        message: `KKM untuk "${subject.name}" harus antara 0-100`
      });
    }
  });
  
  return errors;
};