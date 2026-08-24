import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const steps = [
  'Checking assessment responses...',
  'Preparing risk factors...',
  'Generating prediction...',
  'Preparing explanation...'
];

const Analyzing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: number;
    
    if (currentStep < steps.length) {
      timeout = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800); // 800ms per step
    } else {
      timeout = window.setTimeout(() => {
        navigate('/results');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, navigate]);

  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center max-w-sm w-full">
        {/* Animated Icon */}
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 shadow-inner">
          <div className="absolute inset-0 rounded-full border-4 border-brand-100 border-t-brand-500 animate-spin"></div>
          <Activity className="h-8 w-8 text-brand-600 animate-pulse" />
        </div>
        
        <h2 className="mb-6 text-xl font-bold text-navy-900 text-center">Analyzing Assessment</h2>

        {/* Steps List */}
        <div className="w-full space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center text-sm font-medium transition-all duration-300 ${
                index < currentStep ? 'text-slate-400' : 
                index === currentStep ? 'text-navy-900 scale-105 transform translate-x-2' : 
                'text-slate-300 opacity-50'
              }`}
            >
              {index < currentStep ? (
                <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : index === currentStep ? (
                <div className="mr-3 h-5 w-5 rounded-full border-2 border-brand-500 border-r-transparent animate-spin"></div>
              ) : (
                <div className="mr-3 h-5 w-5 rounded-full border-2 border-slate-200"></div>
              )}
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analyzing;
