
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Edit, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmailPreviewProps {
  complaintId: string;
  complaintTopic: string;
  complaintDescription: string;
  recipient?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: () => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  complaintId,
  complaintTopic,
  complaintDescription,
  recipient = "concerned_authority@gov.in",
  open,
  onOpenChange,
  onSend,
}) => {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [emailContent, setEmailContent] = useState(
    `Subject: Complaint Regarding ${complaintTopic} - Ref ID: ${complaintId}

Dear Concerned Authority,

I am writing to bring to your attention a serious issue that requires immediate attention. Below are the details of my complaint:

Complaint ID: ${complaintId}
Category: ${complaintTopic}

Description:
${complaintDescription}

I request you to take necessary action regarding this matter at the earliest. Please keep me updated on the progress of this complaint.

Thank you for your attention to this matter.

Sincerely,
[Your Name]
`
  );

  const handleSend = () => {
    toast({
      title: translate("email_sent"),
      description: `${translate("email_sent_desc")} ${recipient}`,
      duration: 3000,
    });
    onSend();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {translate("email_preview")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{translate("to")}:</p>
            <p className="text-sm bg-muted p-2 rounded">{recipient}</p>
          </div>

          {isEditing ? (
            <Textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          ) : (
            <div className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm font-mono min-h-[300px]">
              {emailContent}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? translate("preview") : translate("edit_email")}
          </Button>
          <Button onClick={handleSend} className="flex items-center gap-1">
            <Send className="h-4 w-4" />
            {translate("send_email")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailPreview;
