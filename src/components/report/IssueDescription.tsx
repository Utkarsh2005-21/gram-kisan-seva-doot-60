
import React from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IssueDescriptionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onVoiceInput: () => void;
  isRecording: boolean;
}

const IssueDescription: React.FC<IssueDescriptionProps> = ({
  description,
  onDescriptionChange,
  onVoiceInput,
  isRecording,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label className="form-label">Issue Description</Label>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={`px-2 ${isRecording ? "text-red-500 animate-pulse" : "text-app-green"}`}
          onClick={onVoiceInput}
        >
          <Mic className="h-5 w-5 mr-1" />
          {isRecording ? "Stop Recording" : "Voice Input"}
        </Button>
      </div>
      <Textarea
        placeholder="Describe your issue in detail..."
        className="min-h-[120px] text-base"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default IssueDescription;
