
import React, { useState } from "react";
import { Mic, ImagePlus, MapPin, Check, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import NavigationBar from "@/components/NavigationBar";

const ReportIssue = () => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [issueTopic, setIssueTopic] = useState("");
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueCategories = [
    { id: "roads", label: "Roads & Infrastructure" },
    { id: "water", label: "Water Supply" },
    { id: "electricity", label: "Electricity" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "violence", label: "Domestic Violence" },
    { id: "other", label: "Other Issues" },
  ];

  const handleVoiceInput = () => {
    setRecording(true);
    
    // Simulating voice recording
    toast({
      title: "Voice Recording Started",
      description: "Please speak clearly...",
      duration: 3000,
    });
    
    // Simulate a voice input result after 3 seconds
    setTimeout(() => {
      setRecording(false);
      setIssueDescription(
        "The village road connecting to the main highway has large potholes making it difficult for vehicles to pass, especially during the rainy season. This has been a problem for the last 3 months."
      );
      setIssueTopic("roads");
      
      toast({
        title: "Voice Recording Complete",
        description: "Your description has been recorded. Please review and edit if needed.",
        duration: 3000,
      });
    }, 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    toast({
      title: "Getting Location",
      description: "Accessing your current location...",
      duration: 2000,
    });
    
    // Simulate getting location
    setTimeout(() => {
      setLocation("Current Location: Village Rampur, District Sitapur");
      toast({
        title: "Location Found",
        description: "Your location has been detected.",
        duration: 2000,
      });
    }, 1500);
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
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Report Submitted Successfully",
        description: "Your issue has been reported to the authorities.",
        duration: 5000,
      });
      
      // Reset form
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
        <h1 className="text-xl font-bold">Report an Issue</h1>
        <p className="text-sm mt-1">Help us improve your village</p>
      </header>

      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 shadow-md">
          <div className="mb-6">
            <Label className="form-label">Issue Category</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {issueCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant={issueTopic === category.id ? "default" : "outline"}
                  className={`h-auto py-2 px-3 justify-start text-sm ${
                    issueTopic === category.id ? "bg-app-green text-white" : ""
                  }`}
                  onClick={() => setIssueTopic(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <Label className="form-label">Issue Description</Label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className={`px-2 ${recording ? "text-red-500 animate-pulse" : "text-app-green"}`}
                onClick={handleVoiceInput}
              >
                <Mic className="h-5 w-5 mr-1" />
                {recording ? "Recording..." : "Voice Input"}
              </Button>
            </div>
            <Textarea
              placeholder="Describe your issue in detail..."
              className="min-h-[120px] text-base"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </div>

          <div className="form-control">
            <Label className="form-label">Urgency Level</Label>
            <RadioGroup 
              value={urgency} 
              onValueChange={setUrgency} 
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="text-sm text-gray-700">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-sm text-amber-600">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="critical" id="critical" />
                <Label htmlFor="critical" className="text-sm text-red-600">Critical</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="form-control">
            <Label className="form-label">Location</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={getCurrentLocation}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="form-control">
            <Label className="form-label">Add Photo Evidence (Optional)</Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative rounded-md overflow-hidden h-48 bg-gray-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

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
