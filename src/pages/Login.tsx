import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translate } = useLanguage();
  const { updateUserData } = useUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.name || !formData.mobileNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and mobile number.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate login process with a shorter timeout for better user experience
    setTimeout(() => {
      try {
        // Save user data
        updateUserData({
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          location: "",
          language: "english"
        });
        
        // Show success message
        toast({
          title: "Login Successful",
          description: `Welcome, ${formData.name}!`,
          duration: 2000,
        });
        
        // Reset loading state
        setIsLoading(false);
        
        // Navigate to home page - add a small delay for the toast to be visible
        setTimeout(() => {
          console.log("Navigating to home page");
          navigate("/", { replace: true });
        }, 500);
      } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
        toast({
          title: "Login Failed",
          description: "An error occurred during login. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-app-green">
            ग्राम किसान सेवा दूत
          </CardTitle>
          <CardDescription>
            Village Farmer Service Messenger
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{translate("name")}</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <User size={16} />
                </span>
                <Input
                  id="name"
                  name="name"
                  placeholder={translate("enter_name")}
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">{translate("mobile_number")}</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Phone size={16} />
                </span>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  placeholder={translate("enter_mobile_number")}
                  className="pl-10"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <p className="text-xs text-gray-500 pt-2">
              {translate("privacy_note")}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-app-green hover:bg-app-green/90"
              disabled={isLoading}
            >
              {isLoading ? translate("processing") : translate("get_started")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
