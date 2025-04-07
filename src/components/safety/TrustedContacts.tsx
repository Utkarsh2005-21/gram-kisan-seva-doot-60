
import React, { useState } from "react";
import { Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSafety, TrustedContact } from "@/contexts/SafetyContext";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustedContactsManager = () => {
  const { toast } = useToast();
  const { trustedContacts, addTrustedContact, removeTrustedContact } = useSafety();
  const { translate } = useLanguage();
  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });

  const handleAddContact = () => {
    // Basic validation
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide name and phone number for your trusted contact.",
        variant: "destructive",
      });
      return;
    }

    // Add new contact
    const contact: TrustedContact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      relationship: newContact.relationship || "Friend",
    };

    addTrustedContact(contact);
    
    toast({
      title: "Contact Added",
      description: `${newContact.name} has been added as a trusted contact.`,
      duration: 3000,
    });

    // Reset form
    setNewContact({
      name: "",
      phone: "",
      relationship: ""
    });
    setOpen(false);
  };

  const handleDeleteContact = (id: string, name: string) => {
    removeTrustedContact(id);
    
    toast({
      title: "Contact Removed",
      description: `${name} has been removed from your trusted contacts.`,
      duration: 3000,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trusted Contacts</CardTitle>
        <CardDescription>
          People who will receive your SOS alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {trustedContacts.length === 0 ? (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <User className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No trusted contacts added yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Add contacts who should receive your emergency alerts
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {trustedContacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteContact(contact.id, contact.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Trusted Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Trusted Contact</DialogTitle>
              <DialogDescription>
                This person will receive SMS alerts when you trigger an SOS.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Contact name" 
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Phone number with country code" 
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship (Optional)</Label>
                <Input 
                  id="relationship" 
                  placeholder="e.g. Family member, Friend" 
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddContact}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default TrustedContactsManager;
