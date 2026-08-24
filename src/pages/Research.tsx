import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Database, BrainCircuit, Activity, Info } from 'lucide-react';

const modelComparisonData = [
  { name: 'Logistic Reg', accuracy: 78, f1: 76 },
  { name: 'Decision Tree', accuracy: 82, f1: 81 },
  { name: 'Random Forest', accuracy: 91, f1: 90 },
  { name: 'Grad Boost', accuracy: 89, f1: 88 },
  { name: 'SVM', accuracy: 84, f1: 83 },
];

const classDistributionData = [
  { name: 'Low Stress', value: 350, color: '#4ade80' },
  { name: 'Medium Stress', value: 450, color: '#facc15' },
  { name: 'High Stress', value: 300, color: '#f87171' },
];

const featureImportanceData = [
  { name: 'Sleep Quality', importance: 0.28 },
  { name: 'Academic Workload', importance: 0.24 },
  { name: 'Anxiety Level', importance: 0.18 },
  { name: 'Future Concerns', importance: 0.12 },
  { name: 'Social Support', importance: 0.08 },
  { name: 'Self Esteem', importance: 0.05 },
  { name: 'Other Factors', importance: 0.05 },
];

const Research = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-navy-900">Research Dashboard</h1>
          <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Internal Validation Tools
          </div>
        </div>

        {/* Demo Warning */}
        <div className="card p-4 bg-brand-50 border-brand-200 flex gap-3">
          <Info className="text-brand-600 shrink-0" size={24} />
          <div className="text-sm text-brand-800">
            <strong>Demo / Illustrative Results:</strong> The metrics and charts on this dashboard are simulated for demonstration purposes, representing the intended output of the final ML pipeline trained on the student stress dataset.
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <Database size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Dataset Records</span>
            </div>
            <div className="text-2xl font-bold text-navy-900">1,100</div>
          </div>
          
          <div className="card p-5">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <Activity size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Features / Classes</span>
            </div>
            <div className="text-2xl font-bold text-navy-900">20 / 3</div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <BrainCircuit size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Models Evaluated</span>
            </div>
            <div className="text-2xl font-bold text-navy-900">5</div>
          </div>

          <div className="card p-5 bg-navy-900 border-navy-800 text-white">
            <div className="flex items-center gap-3 text-slate-400 mb-2">
              <span className="text-sm font-semibold uppercase tracking-wider">Selected Model</span>
            </div>
            <div className="text-xl font-bold text-brand-400">Random Forest</div>
            <div className="text-xs text-slate-300 mt-1">91% CV Accuracy</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Model Comparison */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-6">Algorithm Performance Comparison</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Bar dataKey="accuracy" name="Accuracy %" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="f1" name="F1 Score %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Feature Importance */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-6">Global Feature Importance (Random Forest)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={featureImportanceData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="importance" fill="#0d9488" radius={[0, 4, 4, 0]}>
                    {featureImportanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 3 ? '#0f766e' : '#5eead4'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class Distribution */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-6">Dataset Target Class Distribution</h2>
            <div className="flex items-center">
              <div className="w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={classDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {classDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-4">
                {classDistributionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-navy-900">{item.value}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500">
                  Total samples: 1,100. Classes are relatively balanced.
                </div>
              </div>
            </div>
          </div>

          {/* Confusion Matrix Mock */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-6">Confusion Matrix (Test Set)</h2>
            
            <div className="w-full max-w-sm mx-auto border border-slate-200 rounded-lg overflow-hidden bg-white">
              <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50">
                <div className="p-2 border-r border-slate-200"></div>
                <div className="p-2 text-center text-xs font-bold text-slate-600 border-r border-slate-200">Pred Low</div>
                <div className="p-2 text-center text-xs font-bold text-slate-600 border-r border-slate-200">Pred Med</div>
                <div className="p-2 text-center text-xs font-bold text-slate-600">Pred High</div>
              </div>
              
              <div className="grid grid-cols-4 border-b border-slate-200">
                <div className="p-2 text-center text-xs font-bold text-slate-600 border-r border-slate-200 bg-slate-50 flex items-center justify-center">True Low</div>
                <div className="p-3 text-center font-medium bg-green-100 text-green-900 border-r border-slate-200">65</div>
                <div className="p-3 text-center text-slate-500 border-r border-slate-200">4</div>
                <div className="p-3 text-center text-slate-500">1</div>
              </div>
              
              <div className="grid grid-cols-4 border-b border-slate-200">
                <div className="p-2 text-center text-xs font-bold text-slate-600 border-r border-slate-200 bg-slate-50 flex items-center justify-center">True Med</div>
                <div className="p-3 text-center text-slate-500 border-r border-slate-200">6</div>
                <div className="p-3 text-center font-medium bg-brand-100 text-brand-900 border-r border-slate-200">82</div>
                <div className="p-3 text-center text-slate-500">2</div>
              </div>
              
              <div className="grid grid-cols-4">
                <div className="p-2 text-center text-xs font-bold text-slate-600 border-r border-slate-200 bg-slate-50 flex items-center justify-center">True High</div>
                <div className="p-3 text-center text-slate-500 border-r border-slate-200">0</div>
                <div className="p-3 text-center text-slate-500 border-r border-slate-200">8</div>
                <div className="p-3 text-center font-medium bg-red-100 text-red-900">52</div>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-4">
              Diagonal shows correct predictions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Research;
