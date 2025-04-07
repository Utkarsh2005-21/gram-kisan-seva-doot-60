
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  Globe, 
  Bell, 
  Moon, 
  Shield, 
  Smartphone, 
  HelpCircle, 
  LogOut, 
  Info, 
  ArrowLeft,
  Fingerprint 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import LanguageSelector from "@/components/LanguageSelector";
import NavigationBar from "@/components/NavigationBar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [safetyEntryTapCount, setSafetyEntryTapCount] = useState(0);

  const handleLanguageChange = (language: string) => {
    toast({
      title: translate("language_changed"),
      description: translate("language_updated"),
      duration: 2000,
    });
  };

  const handleBiometricToggle = () => {
    setBiometricEnabled(!biometricEnabled);
    toast({
      title: !biometricEnabled ? "Biometric Authentication Enabled" : "Biometric Authentication Disabled",
      description: !biometricEnabled 
        ? "You'll now be prompted for fingerprint or face ID when opening the app." 
        : "Standard PIN or pattern will be used for authentication.",
      duration: 3000,
    });
  };

  const handleAboutClick = () => {
    // Secret entry to safety hub
    setSafetyEntryTapCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        navigate("/safety");
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-gray-800 text-white shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-gray-700 mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{translate("settings")}</h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">App Preferences</h2>
          
          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-xs text-gray-500">Choose your preferred language</p>
                    </div>
                  </div>
                  <LanguageSelector onChange={handleLanguageChange} />
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-xs text-gray-500">Receive updates and alerts</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-xs text-gray-500">Toggle dark theme</p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkModeEnabled} 
                    onCheckedChange={setDarkModeEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-lg font-semibold mb-3">Security</h2>
          
          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Fingerprint className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Biometric Authentication</p>
                      <p className="text-xs text-gray-500">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch 
                    checked={biometricEnabled} 
                    onCheckedChange={handleBiometricToggle} 
                  />
                </div>
                
                <div className="flex items-center justify-between p-4" onClick={handleAboutClick}>
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">About</p>
                      <p className="text-xs text-gray-500">App information and version</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          
          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Help Center</p>
                      <p className="text-xs text-gray-500">FAQs and user guides</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-destructive h-10"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </section>
      </main>

      <NavigationBar />
    </div>
  );
};

export default Settings;
