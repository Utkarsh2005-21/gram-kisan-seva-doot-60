
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafety } from "@/contexts/SafetyContext";
import { useLanguage } from "@/contexts/LanguageContext";

const SOSButton = () => {
  const { sendSOS, isSosActive } = useSafety();
  const { translate } = useLanguage();

  return (
    <Button 
      variant="destructive"
      size="lg"
      className={`w-full py-6 text-lg font-bold ${
        isSosActive ? "animate-pulse bg-red-700" : ""
      }`}
      onClick={sendSOS}
      disabled={isSosActive}
    >
      <AlertTriangle className="h-6 w-6 mr-2" />
      {isSosActive ? translate("sos_sent") : translate("send_sos")}
    </Button>
  );
};

export default SOSButton;
