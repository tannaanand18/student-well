import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, LineChart, Activity } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-slate-50 py-20 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/30">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Understand your academic stress <br className="hidden sm:block" />
            <span className="text-brand-600">before it becomes overwhelming.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            StudentWell analyzes your self-reported academic and wellbeing factors using 
            explainable AI to provide a personalized risk assessment and early-warning insights.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/assessment" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
              Start Assessment <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-secondary px-8 py-4 text-base">
              Learn How It Works
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Takes ~2 minutes. No account required.
          </p>
        </div>
      </section>

      {/* Dashboard Preview (Abstract) */}
      <section className="w-full -mt-10 mb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto rounded-md bg-white px-24 py-1 text-xs font-medium text-slate-400 shadow-sm">
              studentwell-demo.app
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="h-8 w-1/3 rounded-lg bg-slate-100"></div>
                <div className="flex gap-4">
                  <div className="h-24 flex-1 rounded-xl bg-brand-50 border border-brand-100"></div>
                  <div className="h-24 flex-1 rounded-xl bg-slate-50 border border-slate-100"></div>
                  <div className="h-24 flex-1 rounded-xl bg-slate-50 border border-slate-100"></div>
                </div>
                <div className="h-40 w-full rounded-xl bg-slate-50 border border-slate-100 mt-8"></div>
              </div>
              <div className="w-full md:w-1/3 space-y-4">
                <div className="h-6 w-1/2 rounded-lg bg-slate-100"></div>
                <div className="h-12 w-full rounded-lg bg-slate-50"></div>
                <div className="h-12 w-full rounded-lg bg-slate-50"></div>
                <div className="h-12 w-full rounded-lg bg-slate-50"></div>
                <div className="h-12 w-full rounded-lg bg-slate-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Proactive wellbeing management
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Our explainable model doesn't just give you a score—it helps you understand exactly which factors are contributing to your stress levels.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900">Early Risk Detection</h3>
              <p className="mt-3 text-slate-600">
                Identify signs of academic stress before they escalate. Our model analyzes multiple dimensions of your university experience.
              </p>
            </div>
            
            <div className="card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900">Understand Your Results</h3>
              <p className="mt-3 text-slate-600">
                Using SHAP (SHapley Additive exPlanations), see exactly how much each factor (like sleep or workload) contributed to your result.
              </p>
            </div>

            <div className="card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900">Track Changes Over Time</h3>
              <p className="mt-3 text-slate-600">
                Take regular check-ins to monitor your wellbeing trends throughout the semester and see if your risk is increasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">How it works</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>
            
            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-xl font-bold text-white shadow-lg border-4 border-slate-50">
                1
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy-900">Complete assessment</h3>
              <p className="mt-2 text-sm text-slate-600">Answer questions about your academic workload, lifestyle, and environment.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-xl font-bold text-white shadow-lg border-4 border-slate-50">
                2
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy-900">Review risk factors</h3>
              <p className="mt-2 text-sm text-slate-600">See your predicted risk level and understand the AI's reasoning clearly.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-xl font-bold text-white shadow-lg border-4 border-slate-50">
                3
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy-900">Track wellbeing trend</h3>
              <p className="mt-2 text-sm text-slate-600">Monitor your stress levels throughout the academic term with actionable insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-navy-900">Ready to check your wellbeing status?</h2>
          <p className="mt-4 text-slate-600">Take the first step towards understanding and managing your academic stress.</p>
          <Link to="/assessment" className="btn-primary mt-8 px-8 py-4">
            Start Assessment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
