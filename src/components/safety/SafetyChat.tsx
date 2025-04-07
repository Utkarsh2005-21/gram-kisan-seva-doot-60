
import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

const SafetyChat = () => {
  const { translate } = useLanguage();
  const [messages, setMessages] = useState<any[]>([
    { 
      role: "assistant", 
      content: "Hello, I'm here to provide guidance on safety, domestic violence, and women's rights. You can ask me questions confidentially. How can I help you today?" 
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const FAQResponses: {[key: string]: string} = {
    "dv protection": "In India, the Protection of Women from Domestic Violence Act, 2005 provides protection against physical, sexual, verbal, emotional, and economic abuse. You can file a complaint with a Protection Officer, police, or directly with the court.",
    "leave abuser": "Safety planning is critical. Prepare important documents, some money, and contact trusted people who can help. Local shelters and NGOs can provide immediate safe accommodation. Call the Women Helpline at 181 for guidance.",
    "police report": "You can file an FIR (First Information Report) at any police station. If they refuse, you can file a complaint with the Superintendent of Police or approach a Magistrate directly under Section 156(3) of CrPC.",
    "legal aid": "Free legal services are available through National Legal Services Authority (NALSA) and State Legal Services Authorities. One Stop Centres also provide legal assistance to women facing violence.",
    "protection order": "A protection order is a court order that restrains the abuser from committing violence, contacting you, or coming near your residence or workplace. You can apply for one through a Protection Officer or directly through a lawyer.",
    "maintenance": "You have the right to financial support from your spouse/partner. You can claim maintenance under various laws including Section 125 of CrPC, Section 20 of DV Act, and personal laws depending on your religion.",
    "children custody": "The court considers the best interest of the child when deciding custody. Under the DV Act, you can get a temporary custody order while other legal proceedings are ongoing."
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: newMessage };
    setMessages([...messages, userMessage]);
    
    // Reset input and show loading
    setNewMessage("");
    setIsLoading(true);
    
    // Process the message and generate a response
    setTimeout(() => {
      let response = "I'm not sure how to help with that specific question. If you're in immediate danger, please call the Women's Helpline at 181 or Emergency Police at 112.";
      
      // Check if the message matches any FAQ topics
      const lowerMsg = newMessage.toLowerCase();
      
      if (lowerMsg.includes("protection") && (lowerMsg.includes("domestic") || lowerMsg.includes("violence"))) {
        response = FAQResponses["dv protection"];
      } else if ((lowerMsg.includes("leave") || lowerMsg.includes("leaving")) && (lowerMsg.includes("abuser") || lowerMsg.includes("husband") || lowerMsg.includes("partner"))) {
        response = FAQResponses["leave abuser"];
      } else if (lowerMsg.includes("police") && (lowerMsg.includes("report") || lowerMsg.includes("complaint") || lowerMsg.includes("file"))) {
        response = FAQResponses["police report"];
      } else if (lowerMsg.includes("legal") && (lowerMsg.includes("aid") || lowerMsg.includes("help") || lowerMsg.includes("assistance"))) {
        response = FAQResponses["legal aid"];
      } else if (lowerMsg.includes("protection") && lowerMsg.includes("order")) {
        response = FAQResponses["protection order"];
      } else if (lowerMsg.includes("money") || lowerMsg.includes("financial") || lowerMsg.includes("maintenance")) {
        response = FAQResponses["maintenance"];
      } else if (lowerMsg.includes("child") || lowerMsg.includes("custody") || lowerMsg.includes("children")) {
        response = FAQResponses["children custody"];
      }
      
      // Add assistant response
      const assistantMessage = { role: "assistant", content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="border-none shadow-sm h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Confidential Chat Support</CardTitle>
        <CardDescription>Ask questions about safety, rights, and resources</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className={message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}>
                      {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 text-sm ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <form 
          className="flex w-full gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Type your question..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default SafetyChat;
