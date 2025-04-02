
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  onChange?: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
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
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
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
