
import React from "react";
import { FileText, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const SafetyResources = () => {
  const { translate } = useLanguage();

  const resources = [
    {
      title: "Know Your Rights",
      description: "Understanding legal protections against domestic violence",
      content: `The Protection of Women from Domestic Violence Act, 2005 protects women from physical, sexual, verbal, emotional, and economic abuse. Key rights include:
      
      • Right to reside in the shared household
      • Right to get protection orders against the abuser
      • Right to custody of children
      • Right to maintenance and compensation
      • Right to free legal aid
      
      If you face domestic violence, you can file a complaint with the Protection Officer, police, or directly approach court through a lawyer.`
    },
    {
      title: "Safety Planning Guide",
      description: "Steps to prepare if you need to leave an unsafe situation",
      content: `If you're in an unsafe situation, having a safety plan can help:
      
      • Identify safe exits from your home
      • Keep emergency numbers saved (not just in your phone)
      • Prepare an emergency bag with essential documents and necessities
      • Establish a code word with trusted friends/family
      • Memorize important phone numbers
      • Save money in a separate account if possible
      • Plan where you would go in an emergency`
    },
    {
      title: "Support Services",
      description: "Government and NGO resources available in your area",
      content: `• One Stop Centres (Sakhi): Medical aid, police assistance, legal help, counseling
      • State Women Commissions: Legal advice and intervention
      • Family Counselling Centres: Counseling and support
      • Legal Services Authorities: Free legal representation
      • NGO Helplines: Shelter, counseling, rehabilitation
      
      Local Shelters Near You:
      • Swadhar Greh (multiple locations)
      • Shakti Shalini, Delhi
      • Gauravi One-Stop Crisis Centre, Bhopal
      • Vimochana, Bangalore`
    }
  ];

  const localOrganizations = [
    {
      name: "Shakti Shalini",
      services: "Shelter, Counseling",
      contact: "011-24373737"
    },
    {
      name: "Jagori",
      services: "Legal Aid, Counseling",
      contact: "011-26692700"
    },
    {
      name: "AIDWA",
      services: "Advocacy, Support",
      contact: "011-23070336"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Safety Resources</CardTitle>
          <CardDescription>Information to help in difficult situations</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {resources.map((resource, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm whitespace-pre-line">
                  {resource.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Local Support Organizations</CardTitle>
          <CardDescription>NGOs and support groups near you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {localOrganizations.map((org, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{org.name}</p>
                    <Badge variant="outline" className="text-xs">{org.services}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{org.contact}</p>
                </div>
                <a href={`tel:${org.contact.replace(/-/g, '')}`} className="text-primary">
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyResources;
