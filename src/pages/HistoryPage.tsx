import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowLeft, TrendingUp, AlertCircle, Info } from 'lucide-react';

interface HistoryRecord {
  id: string;
  timestamp: number;
  riskLevel: string;
  riskScore: number;
  date: string;
}

const defaultMockHistory = [
  { id: '1', timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, riskLevel: 'LOW', riskScore: 34, date: 'Jul 27' },
  { id: '2', timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, riskLevel: 'MEDIUM', riskScore: 56, date: 'Aug 10' },
  { id: '3', timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, riskLevel: 'MEDIUM', riskScore: 61, date: 'Aug 17' },
];

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('assessmentHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure we have enough data points to show a trend, if not, prepend mock data
      if (parsed.length < 3) {
        setHistory([...defaultMockHistory, ...parsed].slice(-6)); // keep last 6
      } else {
        setHistory(parsed.slice(-6));
      }
    } else {
      setHistory(defaultMockHistory);
    }
  }, []);

  const latestRecord = history[history.length - 1];
  const previousRecord = history.length > 1 ? history[history.length - 2] : null;

  const isTrendingUp = previousRecord && latestRecord.riskScore > previousRecord.riskScore;
  const scoreDiff = previousRecord ? latestRecord.riskScore - previousRecord.riskScore : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
          <p className="text-sm font-semibold text-navy-900">{label}</p>
          <p className="text-sm font-medium text-brand-600">
            Score: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/results" className="p-2 text-slate-400 hover:text-navy-900 bg-white rounded-lg border border-slate-200">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-navy-900">Risk History & Trends</h1>
          </div>
        </div>

        {/* Warning Banner */}
        {isTrendingUp && latestRecord.riskScore >= 60 && (
          <div className="card bg-amber-50 border-amber-200 p-4 flex gap-4">
            <div className="text-amber-500 mt-1">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900">Elevated Early Warning</h3>
              <p className="text-sm text-amber-800 mt-1">
                Your predicted risk score has increased by {scoreDiff} points since your last assessment. 
                Consider reviewing your key risk factors and adopting some of the recommended interventions.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Chart Card */}
          <div className="md:col-span-2 card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-navy-900">Longitudinal Trend</h2>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Info size={14} /> Model-derived risk score
              </span>
            </div>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    domain={[0, 100]}
                    ticks={[0, 40, 70, 100]}
                  />
                  
                  {/* Risk Level Thresholds */}
                  <ReferenceLine y={40} stroke="#cbd5e1" strokeDasharray="3 3" />
                  <ReferenceLine y={70} stroke="#cbd5e1" strokeDasharray="3 3" />
                  
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="riskScore" 
                    stroke="#0d9488" 
                    strokeWidth={3}
                    dot={{ fill: '#0d9488', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#0f766e', stroke: '#ccfbf1', strokeWidth: 4 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between mt-4 text-xs font-medium text-slate-400 px-8">
              <span>Low (0-39)</span>
              <span>Medium (40-69)</span>
              <span>High (70+)</span>
            </div>
          </div>

          {/* Stats Column */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Current Status</h3>
              <div className="text-3xl font-bold text-navy-900 mb-1">
                {latestRecord?.riskScore || 0}
                <span className="text-sm font-normal text-slate-400 ml-1">/ 100</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                {isTrendingUp ? (
                  <span className="flex items-center text-red-500">
                    <TrendingUp size={16} className="mr-1" /> +{scoreDiff} from last
                  </span>
                ) : (
                  <span className="flex items-center text-green-500">
                    <TrendingUp size={16} className="mr-1 transform rotate-180" /> {scoreDiff} from last
                  </span>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Assessment Log</h3>
              <div className="space-y-4">
                {[...history].reverse().slice(0, 4).map((record, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div>
                      <div className="text-sm font-medium text-navy-900">{record.date}</div>
                      <div className="text-xs text-slate-500">{record.riskLevel}</div>
                    </div>
                    <div className="text-sm font-bold text-slate-700">
                      {record.riskScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
