
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LocationInputProps {
  location: string;
  onLocationChange: (value: string) => void;
  onGetCurrentLocation: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onGetCurrentLocation,
}) => {
  return (
    <div className="form-control">
      <Label className="form-label">Location</Label>
      <div className="flex gap-2">
        <Input 
          placeholder="Enter location..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={onGetCurrentLocation}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationInput;
