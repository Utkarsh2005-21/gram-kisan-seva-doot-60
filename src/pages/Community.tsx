
import React, { useState } from "react";
import { MessageCircle, ThumbsUp, Clock, User, Send, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";

const Community = () => {
  const { toast } = useToast();
  const [newQuestion, setNewQuestion] = useState("");
  
  const handlePostQuestion = () => {
    if (!newQuestion.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter your question before posting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Question Posted",
      description: "Your question has been posted to the community.",
    });
    
    setNewQuestion("");
  };
  
  const discussions = [
    {
      id: 1,
      author: "Rajesh Kumar",
      avatar: "",
      initials: "RK",
      question: "My wheat crop has yellow spots on the leaves. What could be the cause and remedy?",
      time: "2 hours ago",
      replies: 3,
      likes: 5,
      resolved: false
    },
    {
      id: 2,
      author: "Meera Patel",
      avatar: "",
      initials: "MP",
      question: "When is the best time to sow mustard seeds in North India?",
      time: "1 day ago",
      replies: 8,
      likes: 12,
      resolved: true
    },
    {
      id: 3,
      author: "Suresh Singh",
      avatar: "",
      initials: "SS",
      question: "How can I apply for PM-KISAN scheme without going to the office?",
      time: "3 days ago",
      replies: 6,
      likes: 9,
      resolved: true
    }
  ];
  
  const experts = [
    {
      id: 1,
      name: "Dr. Sharma",
      initials: "DS",
      role: "Agricultural Scientist",
      expertise: "Crop Diseases, Soil Health",
      available: true
    },
    {
      id: 2,
      name: "Mr. Verma",
      initials: "MV",
      role: "District Agriculture Officer",
      expertise: "Government Schemes, Subsidies",
      available: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-earth text-white shadow-md">
        <h1 className="text-xl font-bold">Community Support</h1>
        <p className="text-sm mt-1">Ask questions and get advice</p>
      </header>

      <main className="flex-1 p-4">
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="experts">Expert Help</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions">
            <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-app-earth-light text-app-earth">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="Ask a question about farming or village issues..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handlePostQuestion}
                      className="bg-app-earth hover:bg-app-earth-dark"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Post Question
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div 
                  key={discussion.id} 
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      {discussion.avatar ? (
                        <AvatarImage src={discussion.avatar} alt={discussion.author} />
                      ) : (
                        <AvatarFallback className="bg-app-blue-light text-app-blue">
                          {discussion.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{discussion.author}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {discussion.time}
                        </div>
                      </div>
                      <p className="text-sm my-2">{discussion.question}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </Button>
                        {discussion.resolved && (
                          <span className="text-xs bg-green-100 text-green-700 py-0.5 px-2 rounded">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="experts">
            <div className="bg-app-green-light rounded-lg p-4 mb-4">
              <h3 className="font-medium text-app-green mb-2">Get Expert Advice</h3>
              <p className="text-sm text-gray-600 mb-3">
                Connect with agricultural experts and government officials for personalized guidance on farming and rural issues.
              </p>
              <Input
                placeholder="Type your question for experts..."
                className="mb-3"
              />
              <Button className="w-full bg-app-green">
                <Send className="h-4 w-4 mr-2" />
                Send to Experts
              </Button>
            </div>
            
            <h3 className="font-medium text-gray-800 mb-2">Available Experts</h3>
            <div className="space-y-3">
              {experts.map((expert) => (
                <div key={expert.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-app-blue-light text-app-blue">
                        {expert.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{expert.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          expert.available 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {expert.available ? "Available Now" : "Offline"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-app-blue">{expert.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{expert.expertise}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={!expert.available}
                      className="text-app-blue border-app-blue hover:bg-app-blue-light"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <NavigationBar />
    </div>
  );
};

export default Community;
