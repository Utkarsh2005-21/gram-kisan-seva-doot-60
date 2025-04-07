
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, User, Phone, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCurrentLocation } from "@/utils/locationUtils";
import LanguageSelector from "@/components/LanguageSelector";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate, language } = useLanguage();
  
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/");
    }
  }, [navigate]);

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const locationData = await getCurrentLocation();
      
      if (locationData) {
        setLocation(locationData.address);
        toast({
          title: translate("location_found"),
          description: translate("location_detected"),
          duration: 3000,
        });
      } else {
        toast({
          title: translate("location_error"),
          description: translate("location_manual_entry"),
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
      toast({
        title: translate("location_error"),
        description: translate("location_manual_entry"),
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate input
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid mobile number",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!location.trim()) {
      toast({
        title: "Missing Location",
        description: "Please enter your location or use GPS",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Save user data
    const userData = {
      name,
      mobileNumber,
      location,
      language
    };
    
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Simulate loading (can be removed in production)
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Welcome!",
        description: `Hello ${name}, your account has been created.`,
        duration: 3000,
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">ग्राम किसान सेवा दूत</CardTitle>
              <CardDescription className="pt-1">Village Farmer Service Messenger</CardDescription>
            </div>
            <LanguageSelector />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{translate("name")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder={translate("enter_name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">{translate("mobile_number")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="mobileNumber"
                    placeholder={translate("enter_mobile_number")}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="pl-10"
                    type="tel"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">{translate("location")}</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder={translate("enter_location")}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-app-green hover:bg-app-green-dark" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translate("processing")}
                </>
              ) : (
                translate("get_started")
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-muted-foreground w-full">
            {translate("privacy_note")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
