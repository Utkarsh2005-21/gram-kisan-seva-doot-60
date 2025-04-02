
import React, { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface LanguageSelectorProps {
  onChange?: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("preferredLanguage") || "english";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    
    toast({
      title: "Language Changed",
      description: "Your language preference has been updated.",
      duration: 2000,
    });
    
    if (onChange) {
      onChange(value);
    }
  };

  const languages = [
    { code: "english", name: "English" },
    { code: "hindi", name: "हिंदी (Hindi)" },
    { code: "tamil", name: "தமிழ் (Tamil)" },
    { code: "telugu", name: "తెలుగు (Telugu)" },
    { code: "bengali", name: "বাংলা (Bengali)" },
    { code: "marathi", name: "मराठी (Marathi)" },
    { code: "gujarati", name: "ગુજરાતી (Gujarati)" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ (Punjabi)" },
  ];

  return (
    <div className="w-full max-w-[200px]">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select Language" />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
