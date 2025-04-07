
import React from "react";
import { Phone, Heart, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyContacts = () => {
  const { toast } = useToast();
  const { translate } = useLanguage();

  const emergencyNumbers = [
    {
      name: "Women Helpline",
      number: "181",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      name: "Emergency Police",
      number: "112",
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      name: "Domestic Violence Helpline",
      number: "1091",
      icon: AlertTriangle,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  const handleCall = (number: string, name: string) => {
    // In a mobile app, this would directly initiate a call
    // In web, we can use tel: protocol
    toast({
      title: `Calling ${name}`,
      description: `Dialing ${number}...`,
      duration: 3000,
    });
    
    window.location.href = `tel:${number}`;
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Emergency Helplines</CardTitle>
        <CardDescription>One-touch access to help services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emergencyNumbers.map((contact) => (
            <div 
              key={contact.number}
              className={`flex items-center justify-between p-3 rounded-lg ${contact.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-white ${contact.color}`}>
                  <contact.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm">{contact.number}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white hover:bg-white/90"
                onClick={() => handleCall(contact.number, contact.name)}
              >
                <Phone className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
