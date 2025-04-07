
import { toast } from "@/hooks/use-toast";

// This function starts the speech recognition
export function startSpeechRecognition(
  onResult: (transcript: string) => void,
  onEnd: () => void
) {
  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    toast({
      title: "Not Supported",
      description: "Speech recognition is not supported in your browser.",
      variant: "destructive",
    });
    return null;
  }
  
  try {
    const recognition = new SpeechRecognition();
    
    // Get preferred language from localStorage
    const preferredLanguage = localStorage.getItem("preferredLanguage") || "english";
    
    // Map preferred language to speech recognition language code
    const languageMap: { [key: string]: string } = {
      english: "en-US",
      hindi: "hi-IN",
      tamil: "ta-IN",
      telugu: "te-IN",
      bengali: "bn-IN",
      marathi: "mr-IN",
      gujarati: "gu-IN",
      punjabi: "pa-IN",
    };
    
    // Set recognition properties
    recognition.lang = languageMap[preferredLanguage] || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Start recognition
    recognition.start();
    
    // Handle results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    
    // Handle end of speech
    recognition.onend = () => {
      onEnd();
    };
    
    // Handle errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      onEnd();
      
      // Special handling for safety-related commands
      if (window.location.pathname === "/safety") {
        const errorMessage = event.error === "not-allowed" 
          ? "Microphone access denied. Please check your browser permissions."
          : "Speech recognition failed. Please try again or type your message.";
          
        toast({
          title: "Voice Recognition Error",
          description: errorMessage,
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    
    // Listen for safety-related keywords
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      
      // Special handling for emergency keywords
      const emergencyKeywords = ["help me", "emergency", "sos", "danger", "call police"];
      const lowerTranscript = transcript.toLowerCase();
      
      const isEmergency = emergencyKeywords.some(keyword => lowerTranscript.includes(keyword));
      
      if (isEmergency && window.location.pathname !== "/safety") {
        // Redirect to safety hub for emergency keywords
        toast({
          title: "Emergency Command Detected",
          description: "Redirecting to Safety Hub...",
          duration: 2000,
        });
        
        setTimeout(() => {
          window.location.href = "/safety";
        }, 1000);
      } else {
        // Normal processing for non-emergency commands
        onResult(transcript);
      }
    };
    
    return recognition;
  } catch (error) {
    console.error("Error initializing speech recognition:", error);
    onEnd();
    return null;
  }
}
