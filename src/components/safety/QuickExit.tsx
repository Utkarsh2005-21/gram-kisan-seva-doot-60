
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafety } from "@/contexts/SafetyContext";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickExit = () => {
  const { emergencyExit } = useSafety();
  const { translate } = useLanguage();

  return (
    <Button 
      variant="ghost"
      size="sm"
      className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={emergencyExit}
      aria-label={translate("quick_exit")}
    >
      <X className="h-5 w-5" />
    </Button>
  );
};

export default QuickExit;
