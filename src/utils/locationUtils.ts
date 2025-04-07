
import { useToast } from "@/components/ui/use-toast";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationData {
  coordinates: Coordinates;
  address: string;
}

// This function gets current geolocation and converts it to an address using reverse geocoding
export const getCurrentLocation = async (): Promise<LocationData | null> => {
  try {
    // Get coordinates from browser's geolocation API with high accuracy
    const position: GeolocationPosition = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });
    });
    
    const { latitude, longitude } = position.coords;
    
    // In a real production app, we would use a reverse geocoding service like Google Maps API
    // For this demo, we'll simulate a more realistic response with village/district/state format
    
    try {
      // Attempt to use Nominatim OpenStreetMap API for reverse geocoding (no API key required)
      // Note: In a production app, you would need to use a service with proper rate limiting and caching
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
      
      if (!response.ok) {
        throw new Error("Geocoding API failed");
      }
      
      const data = await response.json();
      
      // Format the address in Indian style (Village, District, State)
      let formattedAddress = "";
      
      if (data.address) {
        const village = data.address.village || data.address.town || data.address.city || data.address.hamlet || "";
        const district = data.address.county || data.address.district || "";
        const state = data.address.state || "";
        
        formattedAddress = [
          village ? `Village ${village}` : "",
          district ? `District ${district}` : "",
          state || ""
        ].filter(Boolean).join(", ");
      }
      
      if (!formattedAddress) {
        throw new Error("Could not parse address");
      }
      
      // Save current location to localStorage for other parts of the app
      const locationData = { coordinates: { latitude, longitude }, address: formattedAddress };
      localStorage.setItem("currentLocation", JSON.stringify(locationData));
      
      return locationData;
    } catch (error) {
      console.error("Error with geocoding service:", error);
      
      // Fallback to our simplified mocking based on coordinates
      let locationAddress = "";
      
      // Mock different regions of India based on latitude/longitude ranges
      if (latitude > 28 && latitude < 29 && longitude > 77 && longitude < 78) {
        locationAddress = "Village Fatehpur, District New Delhi, Delhi";
      } else if (latitude > 18 && latitude < 19 && longitude > 72 && longitude < 73) {
        locationAddress = "Village Gorai, District Mumbai, Maharashtra";
      } else if (latitude > 12 && latitude < 13 && longitude > 77 && longitude < 78) {
        locationAddress = "Village Hesaraghatta, District Bangalore, Karnataka";
      } else if (latitude > 22 && latitude < 23 && longitude > 88 && longitude < 89) {
        locationAddress = "Village Barasat, District Kolkata, West Bengal";
      } else if (latitude > 25 && latitude < 26 && longitude > 82 && longitude < 83) {
        locationAddress = "Village Sarnath, District Varanasi, Uttar Pradesh";
      } else if (latitude > 17 && latitude < 18 && longitude > 78 && longitude < 79) {
        locationAddress = "Village Mokila, District Hyderabad, Telangana";
      } else if (latitude > 30 && latitude < 31 && longitude > 76 && longitude < 77) {
        locationAddress = "Village Khuda Ali Sher, District Chandigarh, Punjab";
      } else {
        locationAddress = `Village near ${latitude.toFixed(2)}, ${longitude.toFixed(2)}, India`;
      }
      
      const locationData = { coordinates: { latitude, longitude }, address: locationAddress };
      localStorage.setItem("currentLocation", JSON.stringify(locationData));
      return locationData;
    }
  } catch (error) {
    console.error("Error getting current location:", error);
    return null;
  }
};

// Get stored location or return null
export const getStoredLocation = (): LocationData | null => {
  const storedLocation = localStorage.getItem("currentLocation");
  return storedLocation ? JSON.parse(storedLocation) : null;
};

// Save a manually entered location
export const saveLocation = (address: string): LocationData => {
  // Without real coordinates, we'll just use a placeholder
  const locationData = { 
    coordinates: { latitude: 0, longitude: 0 }, 
    address: address 
  };
  
  localStorage.setItem("currentLocation", JSON.stringify(locationData));
  return locationData;
};

// Get user location from profile if available
export const getUserLocation = (): string => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsed = JSON.parse(userData);
    if (parsed.location) {
      return parsed.location;
    }
  }
  
  const storedLocation = getStoredLocation();
  return storedLocation ? storedLocation.address : "";
};
