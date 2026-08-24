import { Link } from 'react-router-dom';
import { Shield, Lock, EyeOff, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">
        
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
          <div className="h-16 w-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Privacy & Data Handling</h1>
            <p className="text-slate-500 mt-1">Research Prototype Disclaimer</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
              <FileText className="text-slate-400" size={20} />
              1. Purpose of this System
            </h2>
            <p className="text-slate-600 leading-relaxed">
              StudentWell is a web application prototype built for the research project <em>"Explainable AI-Based Early Detection of Academic Stress Risk Among University Students."</em> 
              <strong> It is not a medical or psychological diagnostic tool.</strong> Any results, scores, or recommendations provided by this demo are for illustrative and research demonstration purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
              <EyeOff className="text-slate-400" size={20} />
              2. Camera and Visual Analysis
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The visual check step in the assessment is an optional feature designed to demonstrate a multimodal approach to risk detection.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Camera access is strictly optional. Users can proceed without granting permission.</li>
              <li>No raw video feeds or images are transmitted to or stored on any server by this frontend demo.</li>
              <li>The visual analysis values shown in this demo are simulated deterministically for demonstration.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
              <Lock className="text-slate-400" size={20} />
              3. Data Storage
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Because this is a frontend prototype, all assessment responses and history logs are stored locally in your browser's <code>localStorage</code>. 
              Clearing your browser data will delete your assessment history. No personal data is currently collected or sent to an external database.
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-sm font-medium text-slate-700 mb-4">
              By using this prototype, you acknowledge that it is a demonstration of explainable AI concepts and not a real clinical application.
            </p>
            <Link to="/" className="btn-secondary">
              Return to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
