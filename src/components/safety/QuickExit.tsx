
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafety } from "@/contexts/SafetyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const QuickExit = () => {
  const { emergencyExit } = useSafety();
  const { translate } = useLanguage();
  const location = useLocation();
  
  // Determine if we're on the safety page to adjust styling
  const isOnSafetyPage = location.pathname === "/safety";
  
  return (
    <Button 
      variant="ghost"
      size="sm"
      className={`fixed top-4 right-4 z-50 rounded-full w-10 h-10 p-0 ${
        isOnSafetyPage 
          ? "bg-purple-700 hover:bg-purple-800 text-white" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={emergencyExit}
      aria-label={translate("quick_exit")}
    >
      <X className="h-5 w-5" />
    </Button>
  );
};

export default QuickExit;
