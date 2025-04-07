
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
    // Get coordinates from browser's geolocation API
    const position: GeolocationPosition = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
    
    const { latitude, longitude } = position.coords;
    
    // In a real production app, we would use a reverse geocoding service like Google Maps API
    // For this demo, we'll simulate the response based on coordinates
    
    // Convert coordinates to a location address (simplified for demo)
    let locationAddress = "";
    
    try {
      // This would normally be a fetch call to a geocoding API
      // For demo purposes, we'll return mock data based on general coordinates ranges
      if (latitude > 20 && latitude < 30 && longitude > 70 && longitude < 85) {
        locationAddress = "Village Rampur, District Sitapur, Uttar Pradesh";
      } else if (latitude > 10 && latitude < 20 && longitude > 75 && longitude < 80) {
        locationAddress = "Village Chennur, District Warangal, Telangana";
      } else if (latitude > 15 && latitude < 25 && longitude > 80 && longitude < 90) {
        locationAddress = "Village Sundarbans, District South 24 Parganas, West Bengal";
      } else {
        locationAddress = "Your Village, Your District";
      }
      
      // Save current location to localStorage for other parts of the app
      const locationData = { coordinates: { latitude, longitude }, address: locationAddress };
      localStorage.setItem("currentLocation", JSON.stringify(locationData));
      
      return locationData;
    } catch (error) {
      console.error("Error converting coordinates to address:", error);
      // Return coordinates without address if reverse geocoding fails
      const locationData = { 
        coordinates: { latitude, longitude }, 
        address: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}` 
      };
      
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
