import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, ScanFace, ChevronRight } from 'lucide-react';

const VisualCheck = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<'idle' | 'granted' | 'denied' | 'error'>('idle');
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasCaptured, setHasCaptured] = useState(false);

  // Stop camera when leaving component
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setPermissionState('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setPermissionState('denied');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate capturing and analyzing delay
    setTimeout(() => {
      setIsCapturing(false);
      setHasCaptured(true);
      stopCamera();
    }, 2000);
  };

  const handleContinue = () => {
    // Save mock visual data if captured, else null
    if (hasCaptured) {
      localStorage.setItem('visualData', JSON.stringify({
        neutral: 55,
        sad: 18,
        fearful: 10,
        happy: 7,
        other: 10
      }));
    } else {
      localStorage.removeItem('visualData');
    }
    
    stopCamera();
    navigate('/analyzing');
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <ScanFace size={24} />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Optional visual check</h1>
          <p className="mt-2 text-slate-600">
            This research prototype explores visible facial-expression patterns as an additional signal. 
            Facial expressions alone cannot determine whether someone is stressed.
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* Camera Viewport */}
          <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
            {permissionState === 'idle' && !hasCaptured && (
              <div className="text-center p-6 text-slate-300">
                <Camera size={48} className="mx-auto mb-4 opacity-50" />
                <p>Camera access is required for this step</p>
              </div>
            )}

            {permissionState === 'denied' && (
              <div className="text-center p-6 text-slate-300">
                <AlertCircle size={48} className="mx-auto mb-4 text-red-400 opacity-80" />
                <p>Camera access was denied or is unavailable.</p>
                <p className="text-sm mt-2 opacity-70">You can safely continue without it.</p>
              </div>
            )}

            {permissionState === 'granted' && !hasCaptured && (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`h-full w-full object-cover ${isCapturing ? 'opacity-50' : ''}`}
              />
            )}

            {hasCaptured && (
              <div className="absolute inset-0 bg-navy-900 flex flex-col items-center justify-center text-white p-6">
                <ScanFace size={48} className="mb-4 text-brand-400" />
                <h3 className="text-xl font-bold mb-6">Demo Analysis Complete</h3>
                <div className="w-full max-w-sm space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-20">Neutral</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden mx-3">
                      <div className="h-full bg-brand-400" style={{ width: '55%' }}></div>
                    </div>
                    <span className="w-10 text-right">55%</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-20">Sad</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden mx-3">
                      <div className="h-full bg-brand-400" style={{ width: '18%' }}></div>
                    </div>
                    <span className="w-10 text-right">18%</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-20 text-slate-400">Other</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden mx-3">
                      <div className="h-full bg-slate-500" style={{ width: '27%' }}></div>
                    </div>
                    <span className="w-10 text-right text-slate-400">27%</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-brand-300 bg-brand-900/50 px-3 py-1.5 rounded">
                  DEMO: Simulated visual-analysis values.
                </p>
              </div>
            )}

            {/* Scanning Overlay */}
            {isCapturing && (
              <div className="absolute inset-0 border-4 border-brand-500/50 rounded-lg">
                <div className="w-full h-1 bg-brand-400 shadow-[0_0_15px_rgba(45,212,191,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-white p-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              {!hasCaptured ? (
                <>
                  {permissionState === 'idle' ? (
                    <button onClick={startCamera} className="btn-secondary w-full sm:w-auto">
                      <Camera size={18} className="mr-2" /> Start Camera
                    </button>
                  ) : permissionState === 'granted' ? (
                    <button 
                      onClick={handleCapture} 
                      disabled={isCapturing}
                      className="btn-primary w-full sm:w-auto"
                    >
                      {isCapturing ? 'Analyzing...' : 'Capture Sample'}
                    </button>
                  ) : (
                    <div className="text-sm text-slate-500">Camera disabled</div>
                  )}
                  
                  <button onClick={handleContinue} className="btn-secondary w-full sm:w-auto ml-auto text-slate-600">
                    Continue without camera <ChevronRight size={16} className="ml-1" />
                  </button>
                </>
              ) : (
                <button onClick={handleContinue} className="btn-primary w-full flex items-center justify-center">
                  Analyze Complete Assessment <ChevronRight size={18} className="ml-2" />
                </button>
              )}
            </div>
            
            {/* Disclaimer */}
            <div className="mt-6 text-xs text-slate-400 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <input type="checkbox" id="consent" className="mt-0.5 rounded border-slate-300 text-brand-500" defaultChecked />
              <label htmlFor="consent" className="leading-relaxed">
                I understand that this is a research demo. No images or video feeds are stored on servers. The analysis runs deterministically for demonstration purposes only.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualCheck;
