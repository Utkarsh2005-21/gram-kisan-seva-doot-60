
import React, { useEffect } from "react";
import { Shield, ArrowLeft, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSafety } from "@/contexts/SafetyContext";

import QuickExit from "@/components/safety/QuickExit";
import SOSButton from "@/components/safety/SOSButton";
import EmergencyContacts from "@/components/safety/EmergencyContacts";
import TrustedContactsManager from "@/components/safety/TrustedContacts";
import SafetyResources from "@/components/safety/SafetyResources";
import SafetyChat from "@/components/safety/SafetyChat";
import { isOnline } from "@/utils/offlineStorage";

const SafetyHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [networkStatus, setNetworkStatus] = React.useState(isOnline());

  // Handle browser history to prevent going back easily
  // In a real app, this would be more sophisticated
  useEffect(() => {
    // Add a hash to the URL when the component mounts
    window.history.pushState(null, document.title, window.location.href + "#safety");
    
    // Handle the popstate event to prevent easy navigation away
    const handlePopState = (event: PopStateEvent) => {
      window.history.pushState(null, document.title, window.location.href);
      toast({
        title: "Safety Feature",
        description: "Please use the back button or quick exit for safety",
        duration: 3000,
      });
    };
    
    window.addEventListener("popstate", handlePopState);
    
    // Clean up
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [toast]);

  // Setup network status listener
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <QuickExit />
      
      <header className="p-4 bg-purple-700 text-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-purple-600"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Personal Safety Hub
              </h1>
              <p className="text-sm mt-0.5 text-purple-100">Confidential assistance & resources</p>
            </div>
          </div>
          <div>
            {networkStatus ? 
              <Wifi className="h-4 w-4 text-white/80" /> :
              <WifiOff className="h-4 w-4 text-red-300" />
            }
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-6">
          <SOSButton />
        </div>
        
        <div className="mb-4">
          <EmergencyContacts />
        </div>
        
        <Tabs defaultValue="resources" className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="contacts">My Contacts</TabsTrigger>
            <TabsTrigger value="chat">Chat Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <SafetyResources />
          </TabsContent>
          
          <TabsContent value="contacts">
            <TrustedContactsManager />
          </TabsContent>
          
          <TabsContent value="chat">
            <SafetyChat />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="fixed bottom-0 inset-x-0 p-4 bg-white border-t">
        <p className="text-xs text-center text-muted-foreground">
          This is a safe and private space. No information is shared without your consent.
        </p>
      </footer>
    </div>
  );
};

export default SafetyHub;
