
import React from "react";
import { Check, Clock, AlertTriangle, PenSquare } from "lucide-react";

interface Update {
  status: string;
  date: string;
  message: string;
}

interface TrackingTimelineProps {
  updates: Update[];
  status: string;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ updates, status }) => {
  // Map status to a step number
  const getStatusStep = (status: string) => {
    switch(status) {
      case "submitted": return 1;
      case "seen": return 2;
      case "in_progress": return 3;
      case "near_complete": return 4;
      case "resolved": return 5;
      default: return 0;
    }
  };

  const getCurrentStep = () => getStatusStep(status);
  
  const steps = [
    { name: "Submitted", icon: PenSquare, step: 1 },
    { name: "Seen by Official", icon: Check, step: 2 },
    { name: "In Progress", icon: Clock, step: 3 },
    { name: "Near Complete", icon: Clock, step: 4 },
    { name: "Resolved", icon: Check, step: 5 }
  ];

  return (
    <div className="relative">
      {/* Horizontal timeline for larger screens */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = getCurrentStep() >= step.step;
          const isCurrent = getCurrentStep() === step.step;
          
          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? "bg-app-green text-white" : "bg-gray-200 text-gray-500"
              } ${isCurrent ? "ring-4 ring-green-100" : ""}`}>
                <StepIcon className="h-5 w-5" />
              </div>
              <p className={`mt-2 text-xs text-center ${
                isActive ? "text-app-green font-medium" : "text-gray-500"
              }`}>
                {step.name}
              </p>
              
              {/* Don't render line after the last item */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-10 w-full h-0.5 ${
                  getCurrentStep() > step.step ? "bg-app-green" : "bg-gray-200"
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Vertical timeline for mobile */}
      <div className="sm:hidden space-y-4 border-l-2 border-gray-200 pl-5 ml-3">
        {updates.map((update, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[26px] mt-1">
              <div className="h-5 w-5 rounded-full bg-app-green flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">{update.status}</p>
              <p className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p className="text-xs text-gray-600 mt-1">{update.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingTimeline;
