export interface AssessmentResponses {
  academicWorkload: number;
  studyLoad: number;
  academicPerformance: number;
  sleepQuality: number;
  anxietyLevel: number;
  selfEsteem: number;
  futureCareerConcerns: number;
  teacherStudentRelationship: number;
  socialSupport: number;
  peerPressure: number;
}

export interface RiskPrediction {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  probabilities: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface FeatureContribution {
  feature: string;
  contribution: number; // positive = increases risk, negative = decreases risk (protective)
  impactLevel: 'High contribution' | 'Medium contribution' | 'Low contribution' | 'Protective factor';
  explanation: string;
}

// Deterministic mock model function
export const predictStressRisk = (responses: AssessmentResponses): RiskPrediction => {
  // Simple scoring based on mock logic
  let score = 0;
  
  // Example logic: higher values (1-5) for negative factors increase score,
  // higher values for positive factors decrease score.
  score += responses.academicWorkload * 4;
  score += responses.studyLoad * 3;
  score -= responses.academicPerformance * 2;
  score += (6 - responses.sleepQuality) * 5; // inverted: poor sleep = higher risk
  score += responses.anxietyLevel * 5;
  score -= responses.selfEsteem * 3;
  score += responses.futureCareerConcerns * 3;
  score -= responses.teacherStudentRelationship * 2;
  score -= responses.socialSupport * 4;
  score += responses.peerPressure * 3;

  // Normalize score to 0-100 range roughly
  const maxPossible = 20 + 15 + 25 + 25 + 15 + 15;
  const minPossible = -10 - 15 - 10 - 20;
  
  const range = maxPossible - minPossible;
  let normalizedScore = ((score - minPossible) / range) * 100;
  normalizedScore = Math.max(0, Math.min(100, Math.round(normalizedScore)));
  
  // Assign risk level based on normalized score
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let probabilities = { low: 0, medium: 0, high: 0 };
  
  if (normalizedScore < 40) {
    riskLevel = 'LOW';
    probabilities = {
      low: 80 - (normalizedScore / 2),
      medium: 15 + (normalizedScore / 4),
      high: 5 + (normalizedScore / 4)
    };
  } else if (normalizedScore < 70) {
    riskLevel = 'MEDIUM';
    probabilities = {
      low: 20 - (normalizedScore / 10),
      medium: 60,
      high: 20 + (normalizedScore / 5)
    };
  } else {
    riskLevel = 'HIGH';
    probabilities = {
      low: 5,
      medium: 15,
      high: 80
    };
  }
  
  // Normalize probabilities to sum to 100
  const sum = probabilities.low + probabilities.medium + probabilities.high;
  probabilities.low = Math.round((probabilities.low / sum) * 100);
  probabilities.medium = Math.round((probabilities.medium / sum) * 100);
  probabilities.high = 100 - probabilities.low - probabilities.medium;
  
  return {
    riskLevel,
    riskScore: normalizedScore,
    probabilities
  };
};

export const calculateFeatureContributions = (responses: AssessmentResponses): FeatureContribution[] => {
  const contributions: FeatureContribution[] = [];
  
  // Calculate relative impacts based on responses
  if (responses.academicWorkload >= 4) {
    contributions.push({
      feature: 'Academic workload',
      contribution: responses.academicWorkload * 2,
      impactLevel: 'High contribution',
      explanation: 'High perceived workload strongly influences predicted stress.'
    });
  }
  
  if (responses.sleepQuality <= 2) {
    contributions.push({
      feature: 'Sleep quality',
      contribution: (6 - responses.sleepQuality) * 2,
      impactLevel: 'High contribution',
      explanation: 'Poor sleep is strongly associated with elevated risk.'
    });
  }
  
  if (responses.anxietyLevel >= 3) {
    contributions.push({
      feature: 'Anxiety level',
      contribution: responses.anxietyLevel * 1.5,
      impactLevel: responses.anxietyLevel >= 4 ? 'High contribution' : 'Medium contribution',
      explanation: 'Elevated anxiety increases the overall model prediction.'
    });
  }
  
  if (responses.socialSupport >= 4) {
    contributions.push({
      feature: 'Social support',
      contribution: -responses.socialSupport * 1.5,
      impactLevel: 'Protective factor',
      explanation: 'Strong social support reduces the predicted risk level.'
    });
  } else if (responses.socialSupport <= 2) {
    contributions.push({
      feature: 'Social support',
      contribution: (6 - responses.socialSupport) * 1.5,
      impactLevel: 'Medium contribution',
      explanation: 'Low social support increases vulnerability to stress.'
    });
  }
  
  if (responses.futureCareerConcerns >= 4) {
    contributions.push({
      feature: 'Future career concerns',
      contribution: responses.futureCareerConcerns,
      impactLevel: 'Medium contribution',
      explanation: 'Career uncertainty contributes to the overall risk score.'
    });
  }

  // Sort by absolute contribution magnitude
  return contributions.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
};

export const generateRecommendations = (contributions: FeatureContribution[]): string[] => {
  const recs: string[] = [];
  
  contributions.forEach(c => {
    if (c.feature === 'Academic workload' && c.contribution > 0) {
      recs.push('Break large academic tasks into smaller, manageable goals.');
      recs.push('Review your weekly workload and set realistic deadlines.');
    }
    if (c.feature === 'Sleep quality' && c.contribution > 0) {
      recs.push('Try to maintain a consistent sleep schedule, even on weekends.');
      recs.push('Limit screen time for at least 30 minutes before going to bed.');
    }
    if (c.feature === 'Anxiety level' && c.contribution > 0) {
      recs.push('Consider practicing mindfulness, deep breathing, or brief meditation daily.');
    }
    if (c.feature === 'Social support' && c.contribution > 0) { // meaning lack of support
      recs.push('Consider connecting with classmates, academic advisors, or university support services.');
    }
    if (c.feature === 'Future career concerns' && c.contribution > 0) {
      recs.push('Visit the university career center for guidance and resume reviews.');
    }
  });
  
  // Ensure we always have at least 3 general recommendations
  if (recs.length < 3) {
    if (!recs.includes('Review your weekly workload and set realistic deadlines.')) {
      recs.push('Review your weekly workload and set realistic deadlines.');
    }
    if (!recs.includes('Try to maintain a consistent sleep schedule, even on weekends.')) {
      recs.push('Try to maintain a consistent sleep schedule, even on weekends.');
    }
    if (!recs.includes('Consider talking with an academic advisor, mentor, counselor or trusted person if concerns continue.')) {
      recs.push('Consider talking with an academic advisor, mentor, counselor or trusted person if concerns continue.');
    }
  }
  
  // Deduplicate and limit to 4
  return [...new Set(recs)].slice(0, 4);
};
