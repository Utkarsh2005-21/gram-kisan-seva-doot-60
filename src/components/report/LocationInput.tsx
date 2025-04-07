import React, { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCurrentLocation } from "@/utils/locationUtils";
import { useUser } from "@/contexts/UserContext";

interface LocationInputProps {
  location: string;
  onLocationChange: (value: string) => void;
  onGetCurrentLocation?: () => void;
  isLoading?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onGetCurrentLocation,
  isLoading = false,
}) => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const { userData } = useUser();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      // First try to use user profile location if available
      if (userData?.location) {
        onLocationChange(userData.location);
        toast({
          title: translate("location_found"),
          description: translate("location_detected"),
          duration: 3000,
        });
        setIsGettingLocation(false);
        return;
      }
      
      // Otherwise get GPS location
      const locationData = await getCurrentLocation();
      
      if (locationData) {
        onLocationChange(locationData.address);
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

  return (
    <div className="form-control">
      <Label className="form-label">{translate("location")}</Label>
      <div className="flex gap-2">
        <Input 
          placeholder={translate("enter_location")}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={onGetCurrentLocation || handleGetLocation}
          disabled={isLoading || isGettingLocation}
        >
          {isLoading || isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LocationInput;
