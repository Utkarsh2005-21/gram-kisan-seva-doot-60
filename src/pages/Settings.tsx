
import React, { useState } from "react";
import { Bell, Globe, HelpCircle, Phone, Shield, User, FileText, Moon, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";
import LanguageSelector from "@/components/LanguageSelector";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    grievances: true,
    weather: true,
    farming: true,
    community: false,
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-gray-800 text-white shadow-md">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm mt-1">Manage your preferences</p>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Account Settings</h2>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Profile Information</p>
                <p className="text-sm text-gray-500">Manage your personal details</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Contact Information</p>
                <p className="text-sm text-gray-500">Update your phone number and address</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">App Settings</h2>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Language Preference</p>
                <p className="text-sm text-gray-500">Change the app language</p>
              </div>
            </div>
            <div className="w-[180px]">
              <LanguageSelector />
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Use dark theme for night use</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Offline Mode</p>
                <p className="text-sm text-gray-500">Save data for offline access</p>
              </div>
            </div>
            <Switch
              checked={offlineMode}
              onCheckedChange={setOfflineMode}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Notification Settings</h2>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Grievance Updates</p>
              <p className="text-sm text-gray-500">Updates on your reported issues</p>
            </div>
            <Switch
              checked={notifications.grievances}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, grievances: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Weather Alerts</p>
              <p className="text-sm text-gray-500">Important weather changes</p>
            </div>
            <Switch
              checked={notifications.weather}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, weather: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Farming Advice</p>
              <p className="text-sm text-gray-500">Farming tips and alerts</p>
            </div>
            <Switch
              checked={notifications.farming}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, farming: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Community Activity</p>
              <p className="text-sm text-gray-500">Replies to your questions</p>
            </div>
            <Switch
              checked={notifications.community}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, community: checked})
              }
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Help & Support</h2>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
              <p className="font-medium">Help Center</p>
            </div>
            <Button variant="ghost" size="sm">Open</Button>
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-3" />
              <p className="font-medium">Terms & Policies</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
          
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-3" />
              <p className="font-medium">Privacy Settings</p>
            </div>
            <Button variant="ghost" size="sm">Manage</Button>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 mb-8 bg-app-green hover:bg-app-green-dark h-12"
          onClick={handleSaveSettings}
        >
          Save All Settings
        </Button>
      </main>

      <NavigationBar />
    </div>
  );
};

export default Settings;
