import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { AssessmentResponses } from '../services/stressModel';

const STEPS = [
  { id: 1, title: 'Academic' },
  { id: 2, title: 'Psychological' },
  { id: 3, title: 'Physical' },
  { id: 4, title: 'Social & Env' },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Partial<AssessmentResponses>>({
    academicWorkload: 3,
    studyLoad: 3,
    academicPerformance: 3,
    sleepQuality: 3,
    anxietyLevel: 3,
    selfEsteem: 3,
    futureCareerConcerns: 3,
    teacherStudentRelationship: 3,
    socialSupport: 3,
    peerPressure: 3,
  });

  const handleChange = (key: keyof AssessmentResponses, value: number) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Save responses for demo purposes (in a real app, this might go to a context or API)
      localStorage.setItem('currentAssessment', JSON.stringify(responses));
      navigate('/assessment/visual-check');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/');
    }
  };

  const renderSlider = (
    key: keyof AssessmentResponses,
    label: string,
    minLabel: string,
    maxLabel: string,
    description: string
  ) => (
    <div className="mb-8">
      <label className="mb-2 block text-base font-semibold text-navy-900">{label}</label>
      <p className="mb-4 text-sm text-slate-500">{description}</p>
      <input
        type="range"
        min="1"
        max="5"
        value={responses[key] as number}
        onChange={(e) => handleChange(key, parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
      />
      <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
        <span>{minLabel} (1)</span>
        <span>{maxLabel} (5)</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span>{STEPS[currentStep - 1].title}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-brand-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-6 sm:p-10">
          <h2 className="mb-8 text-2xl font-bold text-navy-900">{STEPS[currentStep - 1].title} Factors</h2>

          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderSlider(
                'academicWorkload',
                'How would you rate your current academic workload?',
                'Very Light',
                'Overwhelming',
                'Consider your assignments, reading, and project requirements.'
              )}
              {renderSlider(
                'studyLoad',
                'How manageable is your daily study schedule?',
                'Very Manageable',
                'Unmanageable',
                'Reflect on the hours required to keep up with your courses.'
              )}
              {renderSlider(
                'academicPerformance',
                'How satisfied are you with your academic performance?',
                'Very Dissatisfied',
                'Very Satisfied',
                'Think about your recent grades and understanding of the material.'
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderSlider(
                'anxietyLevel',
                'How often do you feel anxious or overwhelmed regarding university?',
                'Rarely',
                'Almost constantly',
                'Include feelings of tension, worry, or physical stress symptoms.'
              )}
              {renderSlider(
                'selfEsteem',
                'How would you rate your current academic self-esteem?',
                'Very Low',
                'Very High',
                'Consider your confidence in your ability to succeed in your program.'
              )}
              {renderSlider(
                'futureCareerConcerns',
                'How worried are you about your future career prospects?',
                'Not worried at all',
                'Extremely worried',
                'Think about job market anxiety and post-graduation plans.'
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderSlider(
                'sleepQuality',
                'How would you rate your sleep quality over the last two weeks?',
                'Very Poor',
                'Excellent',
                'Consider whether you feel rested and get enough hours of sleep.'
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderSlider(
                'teacherStudentRelationship',
                'How supportive are your relationships with professors/instructors?',
                'Not supportive',
                'Very supportive',
                'Reflect on their approachability and willingness to help.'
              )}
              {renderSlider(
                'socialSupport',
                'How strong is your social support network?',
                'Very Weak',
                'Very Strong',
                'Include friends, family, and university support systems.'
              )}
              {renderSlider(
                'peerPressure',
                'How much academic pressure do you feel from your peers?',
                'None at all',
                'A great deal',
                'Consider competitive environments or comparison with classmates.'
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              {currentStep === STEPS.length ? 'Continue to Visual Check' : 'Next Step'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
