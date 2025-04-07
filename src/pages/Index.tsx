
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, FileText, Calendar, CloudRain, Headphones, FileCheck, Wifi, WifiOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";
import LanguageSelector from "@/components/LanguageSelector";
import { startSpeechRecognition } from "@/utils/speechRecognition";
import { isOnline } from "@/utils/offlineStorage";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate } = useLanguage();
  const { isLoggedIn } = useUser();
  const [isListening, setIsListening] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(isOnline());

  // Setup network status listener
  React.useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    
    toast({
      title: translate("voice_assistant"),
      description: translate("speak_request"),
      duration: 3000,
    });
    
    const recognition = startSpeechRecognition(
      // onResult
      (transcript) => {
        console.log("Transcript:", transcript);
        
        const lowerTranscript = transcript.toLowerCase();
        
        // Parse the transcript for navigation commands
        if (lowerTranscript.includes("report") || lowerTranscript.includes("issue") || lowerTranscript.includes("problem")) {
          toast({
            title: "Voice Command Recognized",
            description: "Navigating to report issue page...",
            duration: 2000,
          });
          
          setTimeout(() => {
            navigate("/report");
          }, 1000);
        } 
        else if (lowerTranscript.includes("track") || lowerTranscript.includes("complaint") || lowerTranscript.includes("status")) {
          toast({
            title: "Voice Command Recognized",
            description: "Navigating to complaint tracking page...",
            duration: 2000,
          });
          
          setTimeout(() => {
            navigate("/complaints");
          }, 1000);
        }
        else if (lowerTranscript.includes("farm") || lowerTranscript.includes("crop") || lowerTranscript.includes("weather") || lowerTranscript.includes("agriculture")) {
          toast({
            title: "Voice Command Recognized",
            description: "Navigating to farming assistance page...",
            duration: 2000,
          });
          
          setTimeout(() => {
            navigate("/farming");
          }, 1000);
        }
        else if (lowerTranscript.includes("community") || lowerTranscript.includes("forum") || lowerTranscript.includes("discuss")) {
          toast({
            title: "Voice Command Recognized",
            description: "Navigating to community page...",
            duration: 2000,
          });
          
          setTimeout(() => {
            navigate("/community");
          }, 1000);
        }
        else {
          toast({
            title: "Voice Command Not Recognized",
            description: "Please try again with a clearer command.",
            variant: "destructive",
            duration: 3000,
          });
        }
      },
      // onEnd
      () => {
        setIsListening(false);
      }
    );
    
    if (!recognition) {
      setIsListening(false);
      toast({
        title: "Voice Recognition Failed",
        description: "Your browser may not support voice commands. Please use the buttons instead.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-green text-white shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">ग्राम किसान सेवा दूत</h1>
          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-app-green hover:bg-gray-100 border-none flex gap-1 items-center"
                onClick={() => navigate("/login")}
              >
                <LogIn className="h-4 w-4" />
                {translate("login")}
              </Button>
            )}
            {networkStatus ? 
              <Wifi className="h-4 w-4 text-white/80" /> :
              <WifiOff className="h-4 w-4 text-red-300" />
            }
            <LanguageSelector />
          </div>
        </div>
        <p className="text-sm mt-1">Village Farmer Service Messenger</p>
      </header>

      <main className="flex-1 p-4">
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-app-earth-dark">{translate("welcome")}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Report village issues or get farming assistance. How can we help you today?
            </p>
            
            <Button 
              className="w-full h-14 bg-app-green hover:bg-app-green-dark text-white font-medium rounded-lg flex items-center justify-center gap-3 mb-3"
              onClick={() => navigate("/report")}
            >
              <FileText className="h-5 w-5" />
              {translate("report_issue")}
            </Button>
            
            <Button 
              className="w-full h-14 bg-app-green-light text-app-green hover:bg-app-green-light/80 font-medium rounded-lg flex items-center justify-center gap-3 mb-3"
              onClick={() => navigate("/complaints")}
            >
              <FileCheck className="h-5 w-5" />
              {translate("track_complaints")}
            </Button>
            
            <Button 
              className="w-full h-14 bg-app-blue hover:bg-app-blue-dark text-white font-medium rounded-lg flex items-center justify-center gap-3"
              onClick={() => navigate("/farming")}
            >
              <Calendar className="h-5 w-5" />
              {translate("farming_assistance")}
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div 
            className="bg-app-earth-light rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/farming")}
          >
            <CloudRain className="h-8 w-8 text-app-earth mb-2" />
            <h3 className="text-sm font-medium">{translate("weather_alerts")}</h3>
          </div>
          
          <div 
            className="bg-app-green-light rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/community")}
          >
            <Headphones className="h-8 w-8 text-app-green mb-2" />
            <h3 className="text-sm font-medium">{translate("community_support")}</h3>
          </div>
        </section>

        <div className="fixed bottom-20 right-4">
          <Button 
            className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
              isListening 
                ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                : "bg-app-blue hover:bg-app-blue-dark"
            }`}
            onClick={handleVoiceCommand}
          >
            <Mic className="h-6 w-6 text-white" />
          </Button>
        </div>

        {!networkStatus && (
          <div className="fixed top-16 inset-x-0 bg-amber-50 border-b border-amber-100 p-2 text-amber-800 text-sm text-center">
            <div className="flex items-center justify-center gap-2">
              <WifiOff className="h-4 w-4" />
              <span>{translate("offline_mode")}</span>
            </div>
          </div>
        )}
      </main>

      <NavigationBar />
    </div>
  );
};

export default Index;
