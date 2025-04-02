
import React from "react";
import { useNavigate } from "react-router-dom";
import { Mic, FileText, Calendar, CloudRain, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVoiceCommand = () => {
    toast({
      title: "Voice Assistant Activated",
      description: "Please speak your request...",
      duration: 3000,
    });
    
    // Simulate a voice input
    setTimeout(() => {
      toast({
        title: "Voice Command Received",
        description: "Navigating to report issue page...",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/report");
      }, 1000);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-green text-white shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">ग्राम किसान सेवा दूत</h1>
          <LanguageSelector />
        </div>
        <p className="text-sm mt-1">Village Farmer Service Messenger</p>
      </header>

      <main className="flex-1 p-4">
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-app-earth-dark">Welcome!</h2>
            <p className="text-sm text-gray-600 mb-4">
              Report village issues or get farming assistance. How can we help you today?
            </p>
            
            <Button 
              className="w-full h-14 bg-app-green hover:bg-app-green-dark text-white font-medium rounded-lg flex items-center justify-center gap-3 mb-3"
              onClick={() => navigate("/report")}
            >
              <FileText className="h-5 w-5" />
              Report an Issue
            </Button>
            
            <Button 
              className="w-full h-14 bg-app-blue hover:bg-app-blue-dark text-white font-medium rounded-lg flex items-center justify-center gap-3"
              onClick={() => navigate("/farming")}
            >
              <Calendar className="h-5 w-5" />
              Farming Assistance
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div 
            className="bg-app-earth-light rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/weather")}
          >
            <CloudRain className="h-8 w-8 text-app-earth mb-2" />
            <h3 className="text-sm font-medium">Weather Alerts</h3>
          </div>
          
          <div 
            className="bg-app-green-light rounded-xl p-4 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/community")}
          >
            <Headphones className="h-8 w-8 text-app-green mb-2" />
            <h3 className="text-sm font-medium">Community Support</h3>
          </div>
        </section>

        <div className="fixed bottom-20 right-4">
          <Button 
            className="h-14 w-14 bg-app-blue rounded-full shadow-lg hover:bg-app-blue-dark"
            onClick={handleVoiceCommand}
          >
            <Mic className="h-6 w-6 text-white" />
          </Button>
        </div>
      </main>

      <NavigationBar />
    </div>
  );
};

export default Index;
