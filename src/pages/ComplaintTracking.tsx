
import React, { useState, useEffect } from "react";
import { 
  Calendar, Check, Clock, AlertTriangle, Share2, 
  ChevronDown, ChevronUp, FileText, PenSquare, Mail,
  Printer, RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationBar from "@/components/NavigationBar";
import LanguageSelector from "@/components/LanguageSelector";
import TrackingTimeline from "@/components/TrackingTimeline";
import EmailPreview from "@/components/EmailPreview";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ComplaintTracking = () => {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [submittedIssues, setSubmittedIssues] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [emailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  
  useEffect(() => {
    // Load submitted issues from localStorage
    const savedIssues = localStorage.getItem("submittedIssues");
    if (savedIssues) {
      setSubmittedIssues(JSON.parse(savedIssues));
    }
  }, []);

  const getStatusProgress = (status: string) => {
    switch(status) {
      case "submitted": return 20;
      case "seen": return 40;
      case "in_progress": return 60;
      case "near_complete": return 80;
      case "resolved": return 100;
      default: return 10;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "submitted": return "text-amber-500";
      case "seen": return "text-blue-500";
      case "in_progress": return "text-blue-700";
      case "near_complete": return "text-green-500";
      case "resolved": return "text-green-700";
      default: return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "submitted": return translate("submitted");
      case "seen": return translate("seen");
      case "in_progress": return translate("in_progress");
      case "near_complete": return translate("near_complete");
      case "resolved": return translate("resolved");
      default: return translate("unknown");
    }
  };
  
  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-amber-600 bg-amber-50";
      case "normal": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getCategoryLabel = (id: string) => {
    const categories: Record<string, string> = {
      "roads": translate("roads_infrastructure"),
      "water": translate("water_supply"),
      "electricity": translate("electricity"),
      "education": translate("education"),
      "healthcare": translate("healthcare"),
      "violence": translate("domestic_violence"),
      "other": translate("other_issues")
    };
    return categories[id] || id;
  };

  const handleEscalate = (complaintId: string) => {
    toast({
      title: translate("complaint_escalated"),
      description: translate("complaint_escalated_desc"),
      duration: 3000,
    });
    
    // Update the complaint
    const updatedIssues = submittedIssues.map(issue => {
      if (issue.id === complaintId) {
        return {
          ...issue,
          status: "in_progress",
          updates: [
            ...issue.updates,
            {
              status: "Escalated",
              date: new Date().toISOString(),
              message: "Your complaint has been escalated to a higher authority."
            }
          ]
        };
      }
      return issue;
    });
    
    setSubmittedIssues(updatedIssues);
    localStorage.setItem("submittedIssues", JSON.stringify(updatedIssues));
  };

  const handleShareOnSocial = (complaintId: string) => {
    const complaint = submittedIssues.find(issue => issue.id === complaintId);
    
    if (navigator.share) {
      navigator.share({
        title: `Complaint ${complaintId}`,
        text: `Please help resolve this issue: ${complaint.description}. Complaint ID: ${complaintId}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: translate("shared_successfully"),
          description: translate("complaint_shared"),
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Sharing failed:", error);
        toast({
          title: translate("sharing_failed"),
          description: translate("sharing_failed_desc"),
          variant: "destructive",
          duration: 3000,
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      toast({
        title: translate("share"),
        description: translate("sharing_not_supported"),
        duration: 3000,
      });
    }
  };

  const handleGenerateRTI = (complaintId: string) => {
    toast({
      title: translate("rti_generated"),
      description: translate("rti_generated_desc"),
      duration: 3000,
    });
  };

  const handleOpenEmailPreview = (complaint: any) => {
    setSelectedComplaint(complaint);
    setEmailPreviewOpen(true);
  };

  const handleEmailSent = () => {
    // Update the complaint with a new update about email being sent
    if (selectedComplaint) {
      const updatedIssues = submittedIssues.map(issue => {
        if (issue.id === selectedComplaint.id) {
          return {
            ...issue,
            updates: [
              ...issue.updates,
              {
                status: "Email Sent",
                date: new Date().toISOString(),
                message: "You've sent an email to concerned authority regarding this complaint."
              }
            ]
          };
        }
        return issue;
      });
      
      setSubmittedIssues(updatedIssues);
      localStorage.setItem("submittedIssues", JSON.stringify(updatedIssues));
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const activeComplaints = submittedIssues.filter(issue => issue.status !== "resolved");
  const resolvedComplaints = submittedIssues.filter(issue => issue.status === "resolved");

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-green text-white shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{translate("track_complaints")}</h1>
          <LanguageSelector />
        </div>
        <p className="text-sm mt-1">{translate("track_complaints_desc")}</p>
      </header>

      <main className="flex-1 p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">{translate("active")} ({activeComplaints.length})</TabsTrigger>
            <TabsTrigger value="resolved">{translate("resolved")} ({resolvedComplaints.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeComplaints.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">{translate("no_active_complaints")}</p>
                  <p className="text-sm text-gray-400 mt-1">{translate("issues_will_appear")}</p>
                </CardContent>
              </Card>
            ) : (
              activeComplaints.map((complaint) => (
                <Card key={complaint.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          <span>{getCategoryLabel(complaint.topic)}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(complaint.urgency)}`}>
                            {complaint.urgency}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          ID: {complaint.id} • {formatDate(complaint.dateSubmitted)}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
                      >
                        {expandedId === complaint.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <TrackingTimeline 
                        updates={complaint.updates} 
                        status={complaint.status} 
                      />
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {complaint.description}
                    </p>
                    
                    {expandedId === complaint.id && (
                      <div className="mt-4 border-t pt-3">
                        <h4 className="text-sm font-medium mb-2">{translate("updates")}</h4>
                        <div className="space-y-3">
                          {complaint.updates.map((update: any, index: number) => (
                            <div key={index} className="flex gap-3">
                              <div className="mt-0.5">
                                <div className="h-4 w-4 rounded-full bg-app-green flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{update.status}</p>
                                <p className="text-xs text-gray-500">{formatDate(update.date)}</p>
                                <p className="text-xs text-gray-600 mt-1">{update.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              {translate("view_full_history")}
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>{translate("complaint_history")}</DrawerTitle>
                              <DrawerDescription>
                                ID: {complaint.id} • {formatDate(complaint.dateSubmitted)}
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="px-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>{translate("date")}</TableHead>
                                    <TableHead>{translate("status")}</TableHead>
                                    <TableHead>{translate("details")}</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {complaint.updates.map((update: any, index: number) => (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">{formatDate(update.date)}</TableCell>
                                      <TableCell>{update.status}</TableCell>
                                      <TableCell>{update.message}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            <DrawerFooter>
                              <DrawerClose asChild>
                                <Button variant="outline">{translate("close")}</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                        
                        <h4 className="text-sm font-medium mt-4 mb-2">{translate("next_steps")}</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9"
                            onClick={() => handleEscalate(complaint.id)}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {translate("escalate")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9"
                            onClick={() => handleShareOnSocial(complaint.id)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            {translate("share")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9"
                            onClick={() => handleOpenEmailPreview(complaint)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            {translate("email")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9"
                            onClick={() => handleGenerateRTI(complaint.id)}
                          >
                            <PenSquare className="h-4 w-4 mr-1" />
                            {translate("generate_rti")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9"
                            onClick={() => window.print()}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            {translate("print")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {expandedId !== complaint.id && (
                    <CardFooter className="pt-0 pb-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-app-green p-0 h-auto"
                        onClick={() => setExpandedId(complaint.id)}
                      >
                        {translate("show_details")}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-4">
            {resolvedComplaints.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Check className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">{translate("no_resolved_complaints")}</p>
                  <p className="text-sm text-gray-400 mt-1">{translate("resolved_issues_will_appear")}</p>
                </CardContent>
              </Card>
            ) : (
              resolvedComplaints.map((complaint) => (
                <Card key={complaint.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          {getCategoryLabel(complaint.topic)}
                        </CardTitle>
                        <CardDescription>
                          ID: {complaint.id} • {formatDate(complaint.dateSubmitted)}
                        </CardDescription>
                      </div>
                      <span className="text-white text-xs px-2 py-1 rounded-full bg-green-500">
                        {translate("resolved")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {complaint.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {selectedComplaint && (
        <EmailPreview
          complaintId={selectedComplaint.id}
          complaintTopic={getCategoryLabel(selectedComplaint.topic)}
          complaintDescription={selectedComplaint.description}
          open={emailPreviewOpen}
          onOpenChange={setEmailPreviewOpen}
          onSend={handleEmailSent}
        />
      )}

      <NavigationBar />
    </div>
  );
};

export default ComplaintTracking;
