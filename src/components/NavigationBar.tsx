
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, Calendar, Settings, MessageCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: translate("home"), icon: Home, path: "/" },
    { name: translate("report"), icon: FileText, path: "/report" },
    { name: translate("track"), icon: FileCheck, path: "/complaints" },
    { name: translate("farming"), icon: Calendar, path: "/farming" },
    { name: translate("community"), icon: MessageCircle, path: "/community" },
    { name: translate("settings"), icon: Settings, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center h-full">
        {navigationItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col h-full w-full rounded-none gap-1 py-1",
              isActive(item.path) && "text-app-green border-t-2 border-app-green"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
