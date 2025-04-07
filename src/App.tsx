
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ReportIssue from "./pages/ReportIssue";
import ComplaintTracking from "./pages/ComplaintTracking";
import FarmingAssistance from "./pages/FarmingAssistance";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import SafetyHub from "./pages/SafetyHub";
import NotFound from "./pages/NotFound";
import QuickExit from "./components/safety/QuickExit";
import { setupOfflineListeners } from "./utils/offlineStorage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SafetyProvider } from "./contexts/SafetyContext";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsLoggedIn(true);
    }
    setIsCheckingAuth(false);
    
    // Setup offline/online event listeners
    setupOfflineListeners();
  }, []);

  if (isCheckingAuth) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <SafetyProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <QuickExit />
                <Routes>
                  {/* Root path redirects based on authentication status */}
                  <Route 
                    path="/" 
                    element={isLoggedIn ? <Index /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/login" 
                    element={isLoggedIn ? <Navigate to="/" /> : <Login />} 
                  />
                  <Route 
                    path="/report" 
                    element={isLoggedIn ? <ReportIssue /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/complaints" 
                    element={isLoggedIn ? <ComplaintTracking /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/farming" 
                    element={isLoggedIn ? <FarmingAssistance /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/community" 
                    element={isLoggedIn ? <Community /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/settings" 
                    element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/safety" 
                    element={isLoggedIn ? <SafetyHub /> : <Navigate to="/login" />} 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SafetyProvider>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
