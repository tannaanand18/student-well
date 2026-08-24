import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Landing from './pages/Landing';
import Assessment from './pages/Assessment';
import VisualCheck from './pages/VisualCheck';
import Analyzing from './pages/Analyzing';
import Results from './pages/Results';
import HistoryPage from './pages/HistoryPage';
import Research from './pages/Research';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2 text-navy-900 transition-colors hover:text-navy-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Activity size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">StudentWell</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-navy-900">Overview</Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-navy-900">Methodology</Link>
              <Link to="/privacy" className="text-sm font-medium text-slate-600 hover:text-navy-900">Privacy</Link>
            </nav>
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 sm:inline-block">
                Demo Prototype
              </span>
              <Link to="/assessment" className="btn-primary py-2 px-4 text-sm">
                Start Assessment
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/assessment/visual-check" element={<VisualCheck />} />
            <Route path="/analyzing" element={<Analyzing />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-2 text-navy-900">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-500 text-white">
                    <Activity size={14} />
                  </div>
                  <span className="text-lg font-bold tracking-tight">StudentWell</span>
                </Link>
                <p className="mt-4 max-w-xs text-sm text-slate-500">
                  Explainable AI-Based Early Detection of Academic Stress Risk Among University Students.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Platform</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link to="/assessment" className="text-slate-500 hover:text-navy-900">Assessment</Link></li>
                  <li><Link to="/history" className="text-slate-500 hover:text-navy-900">Risk History</Link></li>
                  <li><Link to="/research" className="text-slate-500 hover:text-navy-900">Research Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Legal & Privacy</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link to="/about" className="text-slate-500 hover:text-navy-900">About & Methodology</Link></li>
                  <li><Link to="/privacy" className="text-slate-500 hover:text-navy-900">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
              <p>Disclaimer: This is a research demo and not a medical or psychological diagnostic tool.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
