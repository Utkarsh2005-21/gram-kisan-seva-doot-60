import React, { useState, useRef, useEffect } from "react";
import { FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";
import { startSpeechRecognition } from "@/utils/speechRecognition";
import IssueCategories from "@/components/report/IssueCategories";
import IssueDescription from "@/components/report/IssueDescription";
import UrgencyLevel from "@/components/report/UrgencyLevel";
import LocationInput from "@/components/report/LocationInput";
import PhotoUpload from "@/components/report/PhotoUpload";
import LanguageSelector from "@/components/LanguageSelector";

const ReportIssue = () => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [issueTopic, setIssueTopic] = useState("");
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedIssues, setSubmittedIssues] = useState<any[]>([]);
  const recognitionRef = useRef<any>(null);

  const issueCategories = [
    { id: "roads", label: "Roads & Infrastructure" },
    { id: "water", label: "Water Supply" },
    { id: "electricity", label: "Electricity" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "violence", label: "Domestic Violence" },
    { id: "other", label: "Other Issues" },
  ];

  useEffect(() => {
    const savedIssues = localStorage.getItem("submittedIssues");
    if (savedIssues) {
      setSubmittedIssues(JSON.parse(savedIssues));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image Uploaded",
      description: "Your image has been attached to the report.",
      duration: 3000,
    });
  };

  const handleVoiceInput = () => {
    if (recording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      return;
    }

    setRecording(true);
    
    toast({
      title: "Voice Recording Started",
      description: "Please speak clearly...",
      duration: 3000,
    });
    
    try {
      recognitionRef.current = startSpeechRecognition(
        (transcript) => {
          setIssueDescription(transcript);
          
          const lowerTranscript = transcript.toLowerCase();
          let detectedTopic = "";
          
          if (lowerTranscript.includes("road") || lowerTranscript.includes("infrastructure") || lowerTranscript.includes("highway") || lowerTranscript.includes("street")) {
            detectedTopic = "roads";
          } else if (lowerTranscript.includes("water") || lowerTranscript.includes("tap") || lowerTranscript.includes("drinking")) {
            detectedTopic = "water";
          } else if (lowerTranscript.includes("electricity") || lowerTranscript.includes("power") || lowerTranscript.includes("outage")) {
            detectedTopic = "electricity";
          } else if (lowerTranscript.includes("school") || lowerTranscript.includes("education") || lowerTranscript.includes("teacher")) {
            detectedTopic = "education";
          } else if (lowerTranscript.includes("hospital") || lowerTranscript.includes("doctor") || lowerTranscript.includes("medical")) {
            detectedTopic = "healthcare";
          } else if (lowerTranscript.includes("violence") || lowerTranscript.includes("abuse") || lowerTranscript.includes("domestic")) {
            detectedTopic = "violence";
          }
          
          if (detectedTopic) {
            setIssueTopic(detectedTopic);
          }
        },
        () => {
          setRecording(false);
          recognitionRef.current = null;
          
          toast({
            title: "Voice Recording Complete",
            description: "Your description has been recorded. Please review and edit if needed.",
            duration: 3000,
          });
        }
      );
      
      if (!recognitionRef.current) {
        setRecording(false);
        toast({
          title: "Voice Recording Failed",
          description: "Your browser may not support speech recognition. Please type your issue instead.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setRecording(false);
      toast({
        title: "Voice Recording Failed",
        description: "There was an error starting the voice recognition. Please try again or type your issue.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const getCurrentLocation = () => {
    toast({
      title: "Getting Location",
      description: "Accessing your current location...",
      duration: 2000,
    });
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location: Village Rampur, District Sitapur");
          toast({
            title: "Location Found",
            description: "Your location has been detected.",
            duration: 2000,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location Error",
            description: "Could not access your location. Please enter it manually.",
            variant: "destructive",
            duration: 3000,
          });
        }
      );
    } else {
      setLocation("Current Location: Village Rampur, District Sitapur");
      toast({
        title: "Location Found",
        description: "Your location has been detected.",
        duration: 2000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueDescription || !issueTopic) {
      toast({
        title: "Missing Information",
        description: "Please provide an issue description and category.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const complaintId = `COMP-${Date.now().toString().slice(-6)}`;
    
    const newComplaint = {
      id: complaintId,
      topic: issueTopic,
      description: issueDescription,
      urgency,
      location,
      imageUrl: imagePreview,
      status: "submitted",
      dateSubmitted: new Date().toISOString(),
      nextEscalation: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      updates: [
        {
          status: "Submitted",
          date: new Date().toISOString(),
          message: "Your complaint has been recorded in our system."
        }
      ]
    };
    
    setTimeout(() => {
      const updatedIssues = [...submittedIssues, newComplaint];
      setSubmittedIssues(updatedIssues);
      localStorage.setItem("submittedIssues", JSON.stringify(updatedIssues));
      
      setIsSubmitting(false);
      
      toast({
        title: "Report Submitted Successfully",
        description: `Your complaint (ID: ${complaintId}) has been reported to the authorities.`,
        duration: 5000,
      });
      
      setIssueDescription("");
      setIssueTopic("");
      setUrgency("normal");
      setLocation("");
      setImagePreview(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-green text-white shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Report an Issue</h1>
          <LanguageSelector />
        </div>
        <p className="text-sm mt-1">Help us improve your village</p>
      </header>

      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 shadow-md">
          <IssueCategories 
            categories={issueCategories}
            selectedCategory={issueTopic}
            onSelectCategory={setIssueTopic}
          />

          <IssueDescription
            description={issueDescription}
            onDescriptionChange={setIssueDescription}
            onVoiceInput={handleVoiceInput}
            isRecording={recording}
          />

          <UrgencyLevel 
            urgency={urgency}
            onUrgencyChange={setUrgency}
          />

          <LocationInput
            location={location}
            onLocationChange={setLocation}
            onGetCurrentLocation={getCurrentLocation}
          />

          <PhotoUpload
            imagePreview={imagePreview}
            onImageUpload={handleImageUpload}
            onRemoveImage={() => setImagePreview(null)}
          />

          <Button 
            type="submit" 
            className="w-full h-12 mt-6 bg-app-green hover:bg-app-green-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Submit Report
              </span>
            )}
          </Button>
        </form>
      </main>

      <NavigationBar />
    </div>
  );
};

export default ReportIssue;
