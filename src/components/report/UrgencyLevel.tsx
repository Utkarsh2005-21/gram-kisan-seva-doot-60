
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UrgencyLevelProps {
  urgency: string;
  onUrgencyChange: (value: string) => void;
}

const UrgencyLevel: React.FC<UrgencyLevelProps> = ({ urgency, onUrgencyChange }) => {
  return (
    <div className="form-control">
      <Label className="form-label">Urgency Level</Label>
      <RadioGroup 
        value={urgency} 
        onValueChange={onUrgencyChange} 
        className="flex space-x-4 mt-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="normal" id="normal" />
          <Label htmlFor="normal" className="text-sm text-gray-700">Normal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high" className="text-sm text-amber-600">High</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="critical" id="critical" />
          <Label htmlFor="critical" className="text-sm text-red-600">Critical</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default UrgencyLevel;
