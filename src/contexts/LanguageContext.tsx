import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translate: (key: string) => key,
});

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    home: "Home",
    report: "Report",
    track: "Track",
    farming: "Farming",
    community: "Community",
    settings: "Settings",
    // Common texts
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    close: "Close",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    
    // Complaint tracking specific
    track_complaints: "Track Your Complaints",
    track_complaints_desc: "Monitor and escalate your reported issues",
    active: "Active",
    resolved: "Resolved",
    no_active_complaints: "No active complaints.",
    issues_will_appear: "Issues you report will appear here.",
    no_resolved_complaints: "No resolved complaints.",
    resolved_issues_will_appear: "Resolved issues will appear here.",
    submitted: "Submitted",
    seen: "Seen by Official",
    in_progress: "In Progress",
    near_complete: "Near Complete",
    resolved: "Resolved",
    unknown: "Unknown",
    updates: "Updates",
    view_full_history: "View Full History",
    complaint_history: "Complaint History",
    next_steps: "Next Steps",
    escalate: "Escalate",
    share: "Share",
    email: "Email",
    generate_rti: "Generate RTI",
    print: "Print",
    show_details: "Show details",
    date: "Date",
    status: "Status",
    details: "Details",
    
    // Email related
    complaint_escalated: "Complaint Escalated",
    complaint_escalated_desc: "Your complaint has been escalated to a higher authority.",
    shared_successfully: "Shared Successfully",
    complaint_shared: "Your complaint has been shared.",
    sharing_failed: "Sharing Failed",
    sharing_failed_desc: "Could not share your complaint. Please try again.",
    sharing_not_supported: "Sharing is not supported in your browser. Please use the copy button to copy the link.",
    rti_generated: "RTI Generated",
    rti_generated_desc: "An RTI application has been generated. You will receive it via email.",
    
    // Categories
    roads_infrastructure: "Roads & Infrastructure",
    water_supply: "Water Supply",
    electricity: "Electricity",
    education: "Education",
    healthcare: "Healthcare",
    domestic_violence: "Domestic Violence",
    other_issues: "Other Issues"
  },
  hi: {
    home: "होम",
    report: "रिपोर्ट",
    track: "ट्रैक",
    farming: "कृषि",
    community: "समुदाय",
    settings: "सेटिंग्स",
    // Common texts
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    close: "बंद करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    search: "खोज",
    filter: "फ़िल्टर",
    sort: "क्रमबद्ध करें",
    
    // Complaint tracking specific
    track_complaints: "अपनी शिकायतें ट्रैक करें",
    track_complaints_desc: "अपनी रिपोर्ट की गई समस्याओं की निगरानी करें और उन्हें बढ़ाएं",
    active: "सक्रिय",
    resolved: "हल किए गए",
    no_active_complaints: "कोई सक्रिय शिकायत नहीं।",
    issues_will_appear: "आपके द्वारा रिपोर्ट की गई समस्याएं यहां दिखाई देंगी।",
    no_resolved_complaints: "कोई हल की गई शिकायत नहीं।",
    resolved_issues_will_appear: "हल की गई समस्याएं यहां दिखाई देंगी।",
    submitted: "जमा किया गया",
    seen: "अधिकारी द्वारा देखा गया",
    in_progress: "प्रगति पर है",
    near_complete: "लगभग पूरा हुआ",
    resolved: "हल किया गया",
    unknown: "अज्ञात",
    updates: "अपडेट",
    view_full_history: "पूरा इतिहास देखें",
    complaint_history: "शिकायत इतिहास",
    next_steps: "अगले कदम",
    escalate: "बढ़ाएं",
    share: "शेयर करें",
    email: "ईमेल",
    generate_rti: "RTI जनरेट करें",
    print: "प्रिंट करें",
    show_details: "विवरण दिखाएं",
    date: "तारीख",
    status: "स्थिति",
    details: "विवरण",
    
    // Email related
    complaint_escalated: "शिकायत बढ़ाई गई",
    complaint_escalated_desc: "आपकी शिकायत उच्च अधिकारी को बढ़ा दी गई है।",
    shared_successfully: "सफलतापूर्वक साझा किया गया",
    complaint_shared: "आपकी शिकायत साझा की गई है।",
    sharing_failed: "साझा करना विफल",
    sharing_failed_desc: "आपकी शिकायत साझा नहीं की जा सकी। कृपया पुनः प्रयास करें।",
    sharing_not_supported: "आपके ब्राउज़र में शेयरिंग समर्थित नहीं है। कृपया लिंक को कॉपी करने के लिए कॉपी बटन का उपयोग करें।",
    rti_generated: "RTI जनरेट किया गया",
    rti_generated_desc: "एक RTI आवेदन जनरेट किया गया है। आपको इसे ईमेल के माध्यम से प्राप्त होगा।",
    
    // Categories
    roads_infrastructure: "सड़कें और बुनियादी ढांचा",
    water_supply: "जल आपूर्ति",
    electricity: "बिजली",
    education: "शिक्षा",
    healthcare: "स्वास्थ्य सेवा",
    domestic_violence: "घरेलू हिंसा",
    other_issues: "अन्य मुद्दे"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translate = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => useContext(LanguageContext);
