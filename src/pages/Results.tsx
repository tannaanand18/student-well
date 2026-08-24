import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Info, CheckCircle2, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { 
  predictStressRisk, 
  calculateFeatureContributions, 
  generateRecommendations
} from '../services/stressModel';
import type {
  AssessmentResponses,
  RiskPrediction,
  FeatureContribution
} from '../services/stressModel';

const Results = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const [contributions, setContributions] = useState<FeatureContribution[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  useEffect(() => {
    // Load assessment data
    const savedResponses = localStorage.getItem('currentAssessment');
    if (!savedResponses) {
      navigate('/assessment');
      return;
    }
    
    const responses: AssessmentResponses = JSON.parse(savedResponses);
    
    // Run mock ML pipeline
    const pred = predictStressRisk(responses);
    const contribs = calculateFeatureContributions(responses);
    const recs = generateRecommendations(contribs);
    
    setPrediction(pred);
    setContributions(contribs);
    setRecommendations(recs);
    
    // Save to history
    const historyString = localStorage.getItem('assessmentHistory');
    const history = historyString ? JSON.parse(historyString) : [];
    
    // Only save if it's not a duplicate of the last one
    if (history.length === 0 || history[history.length - 1].timestamp < Date.now() - 10000) {
      history.push({
        id: Date.now().toString(),
        timestamp: Date.now(),
        riskLevel: pred.riskLevel,
        riskScore: pred.riskScore,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
      localStorage.setItem('assessmentHistory', JSON.stringify(history));
    }
    
  }, [navigate]);

  if (!prediction) return null;

  const getRiskColor = (level: string) => {
    if (level === 'HIGH') return 'text-red-600 bg-red-50 border-red-200';
    if (level === 'MEDIUM') return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskBadgeColor = (level: string) => {
    if (level === 'HIGH') return 'bg-red-100 text-red-800';
    if (level === 'MEDIUM') return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  const maxContrib = Math.max(...contributions.map(c => Math.abs(c.contribution)));

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-navy-900">Assessment Results</h1>
          <div className="flex items-center gap-3">
            <Link to="/history" className="btn-secondary py-2 px-4 text-sm bg-white">
              <BarChart2 size={16} className="mr-2" /> View History
            </Link>
            <Link to="/assessment" className="btn-primary py-2 px-4 text-sm">
              <RefreshCw size={16} className="mr-2" /> Retake
            </Link>
          </div>
        </div>

        {/* Top Summary Card */}
        <div className={`card overflow-hidden border-2 ${prediction.riskLevel === 'HIGH' ? 'border-red-200' : 'border-slate-200'}`}>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium text-slate-500 mb-1">Current Assessment • {new Date().toLocaleDateString()}</p>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-4xl font-extrabold text-navy-900 tracking-tight">
                  {prediction.riskLevel} Risk
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getRiskBadgeColor(prediction.riskLevel)}`}>
                  {prediction.riskScore}/100 Score
                </span>
              </div>
              
              {prediction.riskLevel === 'HIGH' && (
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-red-700 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                  <ShieldAlert size={16} />
                  <span className="font-medium">Elevated academic-stress risk detected.</span>
                </div>
              )}
            </div>
            
            {/* Probabilities */}
            <div className="w-full md:w-64 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Model Probabilities</h3>
              
              <div className="flex items-center text-sm">
                <span className="w-16 font-medium text-slate-600">Low</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-green-400" style={{ width: `${prediction.probabilities.low}%` }}></div>
                </div>
                <span className="w-10 text-right font-medium">{prediction.probabilities.low}%</span>
              </div>
              
              <div className="flex items-center text-sm">
                <span className="w-16 font-medium text-slate-600">Medium</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-amber-400" style={{ width: `${prediction.probabilities.medium}%` }}></div>
                </div>
                <span className="w-10 text-right font-medium">{prediction.probabilities.medium}%</span>
              </div>
              
              <div className="flex items-center text-sm">
                <span className="w-16 font-medium text-slate-600">High</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-red-400" style={{ width: `${prediction.probabilities.high}%` }}></div>
                </div>
                <span className="w-10 text-right font-medium">{prediction.probabilities.high}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SHAP Explanation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-navy-900">Why this result?</h3>
                <div className="flex items-center text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  <Info size={14} className="mr-1" /> SHAP Demo Explanation
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                These factors had the strongest influence on this model prediction. 
                They do not prove that any individual factor caused your stress, but rather show how the AI interpreted your responses.
              </p>
              
              <div className="space-y-6">
                {contributions.map((c, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-medium text-slate-800 text-sm">{c.feature}</span>
                      <span className={`text-xs font-semibold ${c.contribution > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {c.impactLevel}
                      </span>
                    </div>
                    
                    {/* SHAP-style center-aligned bar */}
                    <div className="flex items-center h-4 w-full">
                      {/* Negative side */}
                      <div className="flex-1 flex justify-end pr-1 border-r-2 border-slate-300">
                        {c.contribution < 0 && (
                          <div 
                            className="h-2.5 bg-green-400 rounded-l-sm" 
                            style={{ width: `${(Math.abs(c.contribution) / maxContrib) * 100}%` }}
                          />
                        )}
                      </div>
                      
                      {/* Positive side */}
                      <div className="flex-1 flex justify-start pl-1">
                        {c.contribution > 0 && (
                          <div 
                            className="h-2.5 bg-red-400 rounded-r-sm" 
                            style={{ width: `${(Math.abs(c.contribution) / maxContrib) * 100}%` }}
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                      <span>Reduces risk</span>
                      <span>Increases risk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detailed Factors Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Your Key Factors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contributions.slice(0, 4).map((c, idx) => (
                  <div key={idx} className="card p-5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.contribution > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {c.contribution > 0 ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                    </div>
                    <h4 className="font-semibold text-navy-900 mb-1">{c.feature}</h4>
                    <p className="text-sm text-slate-600">{c.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recommendations Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 bg-brand-50/50 border-brand-100">
              <h3 className="text-lg font-bold text-navy-900 mb-4">What you can consider</h3>
              <ul className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700">
                    <div className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-brand-100/50">
                <p className="text-xs text-slate-500">
                  These are general wellbeing suggestions derived from the AI explanation. This is not medical advice.
                </p>
              </div>
            </div>
            
            {/* Demo Notice */}
            <div className="card p-5 bg-slate-50 border-dashed border-slate-300 flex gap-3">
              <Info className="text-slate-400 shrink-0" size={20} />
              <div className="text-xs text-slate-500">
                <strong>Demo Mode Indicator:</strong> Results on this page are generated using deterministic mock logic, not a real machine learning backend.
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Results;
