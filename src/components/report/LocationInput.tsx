
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationInputProps {
  location: string;
  onLocationChange: (value: string) => void;
  onGetCurrentLocation: () => void;
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
          onClick={onGetCurrentLocation}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-t-transparent" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LocationInput;
