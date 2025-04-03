
import React from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { translate } = useLanguage();
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label className="form-label">{translate("details")}</Label>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={`px-2 ${isRecording ? "text-red-500 bg-red-50 animate-pulse" : "text-app-green"}`}
          onClick={onVoiceInput}
        >
          {isRecording ? (
            <>
              <MicOff className="h-5 w-5 mr-1" />
              {translate("close")}
            </>
          ) : (
            <>
              <Mic className="h-5 w-5 mr-1" />
              {translate("voice_assistant")}
            </>
          )}
        </Button>
      </div>
      <Textarea
        placeholder={translate("issues_will_appear")}
        className="min-h-[120px] text-base"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      {isRecording && (
        <div className="mt-2 text-sm text-red-500 animate-pulse flex items-center justify-center p-2 bg-red-50 rounded-md">
          <Mic className="h-4 w-4 mr-1" />
          {translate("speak_request")}
        </div>
      )}
    </div>
  );
};

export default IssueDescription;
