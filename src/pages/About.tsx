import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Activity, LineChart, FileText } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-navy-900 mb-6">About & Methodology</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            StudentWell is a research prototype developed for the project: <strong>"Explainable AI-Based Early Detection of Academic Stress Risk Among University Students."</strong> It demonstrates how machine learning can be used to identify early signs of stress while providing clear, understandable explanations for its predictions.
          </p>

          <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <Activity className="text-brand-500" size={24} />
            Current Architecture
          </h2>
          <p className="mb-6 text-slate-600">
            The current system operates on self-reported data. The pipeline is designed to be transparent rather than a "black box" prediction system.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-10">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center text-sm font-medium text-slate-700">
              <div className="bg-white px-3 py-2 rounded shadow-sm border border-slate-200">Student Responses</div>
              <ArrowRight className="hidden sm:block text-slate-400" size={16} />
              <div className="bg-white px-3 py-2 rounded shadow-sm border border-slate-200">ML Prediction</div>
              <ArrowRight className="hidden sm:block text-slate-400" size={16} />
              <div className="bg-brand-50 px-3 py-2 rounded shadow-sm border border-brand-200 text-brand-800">SHAP Explanation</div>
              <ArrowRight className="hidden sm:block text-slate-400" size={16} />
              <div className="bg-white px-3 py-2 rounded shadow-sm border border-slate-200">Recommendations</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              <strong>Explainability:</strong> By using SHAP (SHapley Additive exPlanations), the system identifies the specific factors (e.g., sleep quality, workload) that most strongly influenced the model's output for each individual.
            </p>
          </div>

          <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <BrainCircuit className="text-brand-500" size={24} />
            Future Multimodal Architecture
          </h2>
          <p className="mb-6 text-slate-600">
            The full research scope includes a multimodal approach, combining questionnaire data with computer-vision-based facial expression analysis. 
            The visual check step in this demo illustrates where this technology would integrate.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-10">
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-slate-400" />
                <div className="text-sm font-medium text-slate-700">Questionnaire Features</div>
              </div>
              <div className="pl-[9px] border-l-2 border-slate-200 ml-[8px] h-4"></div>
              <div className="flex items-center gap-3">
                <BrainCircuit size={18} className="text-slate-400" />
                <div className="text-sm font-medium text-slate-700">Facial Expression Features</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <ArrowRight className="text-slate-400 rotate-90 sm:rotate-0" size={16} />
              <div className="bg-brand-100 px-4 py-2 rounded shadow-sm border border-brand-200 text-brand-900">Feature Fusion</div>
              <ArrowRight className="text-slate-400" size={16} />
              <div className="bg-navy-900 text-white px-4 py-2 rounded shadow-sm">Multimodal Risk Model</div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <LineChart className="text-brand-500" size={24} />
            Early Warning Focus
          </h2>
          <p className="text-slate-600 mb-8">
            This system is not designed to diagnose stress at a single point in time. Instead, it is an early-warning system. By tracking longitudinal risk trends, students and university support services can identify escalating issues before they result in academic burnout or severe distress.
          </p>
          
          <div className="border-t border-slate-200 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-500">Ready to test the prototype?</p>
              <Link to="/assessment" className="btn-primary">
                Start Demo Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
