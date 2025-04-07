
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import ComplaintTracking from "./pages/ComplaintTracking";
import FarmingAssistance from "./pages/FarmingAssistance";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import SafetyHub from "./pages/SafetyHub";
import NotFound from "./pages/NotFound";
import { setupOfflineListeners } from "./utils/offlineStorage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SafetyProvider } from "./contexts/SafetyContext";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup offline/online event listeners
    setupOfflineListeners();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SafetyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/report" element={<ReportIssue />} />
                <Route path="/complaints" element={<ComplaintTracking />} />
                <Route path="/farming" element={<FarmingAssistance />} />
                <Route path="/community" element={<Community />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/safety" element={<SafetyHub />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SafetyProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
