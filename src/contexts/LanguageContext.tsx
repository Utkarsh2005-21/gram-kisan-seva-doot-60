import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'english',
  setLanguage: () => {},
  translate: (key: string) => key,
});

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  english: {
    // Navigation
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
    
    // Home screen
    welcome: "Welcome",
    report_issue: "Report an Issue",
    track_complaints: "Track Complaints",
    farming_assistance: "Farming Assistance",
    weather_alerts: "Weather Alerts",
    community_support: "Community Support",
    voice_assistant: "Voice Assistant",
    speak_request: "Please speak your request clearly...",
    offline_mode: "You're offline. Changes will sync when you're back online.",
    
    // Complaint tracking specific
    track_complaints_desc: "Monitor and escalate your reported issues",
    active_complaints: "Active",
    resolved_complaints: "Resolved",
    no_active_complaints: "No active complaints.",
    issues_will_appear: "Issues you report will appear here.",
    no_resolved_complaints: "No resolved complaints.",
    resolved_issues_will_appear: "Resolved issues will appear here.",
    submitted_status: "Submitted",
    seen_status: "Seen by Official",
    in_progress_status: "In Progress",
    near_complete_status: "Near Complete",
    resolved_status: "Resolved",
    unknown_status: "Unknown",
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
    
    // Location and Weather
    location: "Location",
    getting_location: "Getting Location",
    accessing_location: "Accessing your current location...",
    location_found: "Location Found",
    location_detected: "Your location has been detected.",
    location_error: "Location Error",
    location_manual_entry: "Could not access your location. Please enter it manually.",
    location_fallback: "Location Set",
    location_entered_manually: "A location has been set for you.",
    enter_location: "Enter location...",
    current_weather: "Current Weather",
    updated_recently: "Updated 30 minutes ago",
    loading_weather: "Loading weather data...",
    weather_crops_schemes: "Weather, crops, and government schemes",
    
    // Reports
    submitting: "Submitting...",
    submit_report: "Submit Report",
    help_improve_village: "Help us improve your village",
    
    // Email related
    email_preview: "Email Preview",
    to: "To:",
    preview: "Preview",
    edit_email: "Edit Email",
    send_email: "Send Email",
    email_sent: "Email Sent Successfully",
    email_sent_desc: "Your email has been sent to",
    complaint_escalated: "Complaint Escalated",
    complaint_escalated_desc: "Your complaint has been escalated to a higher authority.",
    shared_successfully: "Shared Successfully",
    complaint_shared: "Your complaint has been shared.",
    sharing_failed: "Sharing Failed",
    sharing_failed_desc: "Could not share your complaint. Please try again.",
    sharing_not_supported: "Sharing is not supported in your browser. Please use the copy button to copy the link.",
    rti_generated: "RTI Generated",
    rti_generated_desc: "An RTI application has been generated. You will receive it via email.",
    
    // Language related
    language_changed: "Language Changed",
    language_updated: "Your language preference has been updated.",
    
    // Categories
    roads_infrastructure: "Roads & Infrastructure",
    water_supply: "Water Supply",
    electricity: "Electricity",
    education: "Education",
    healthcare: "Healthcare",
    domestic_violence: "Domestic Violence",
    other_issues: "Other Issues",
    
    // Safety
    quick_exit: "Quick exit"
  },
  hindi: {
    // Navigation
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
    
    // Location and Weather
    location: "स्थान",
    getting_location: "स्थान प्राप्त कर रहे हैं",
    accessing_location: "आपके वर्तमान स्थान तक पहुंच रहे हैं...",
    location_found: "स्थान मिल गया",
    location_detected: "आपका स्थान पता चल गया है।",
    location_error: "स्थान त्रुटि",
    location_manual_entry: "आपके स्थान तक पहुंच नहीं सकते। कृपया मैन्युअल रूप से दर्ज करें।",
    location_fallback: "स्थान सेट किया गया",
    location_entered_manually: "आपके लिए एक स्थान सेट किया गया है।",
    enter_location: "स्थान दर्ज करें...",
    current_weather: "वर्तमान मौसम",
    updated_recently: "30 मिनट पहले अपडेट किया गया",
    loading_weather: "मौसम डेटा लोड हो रहा है...",
    weather_crops_schemes: "मौसम, फसलें और सरकारी योजनाएं",
    
    // Reports
    submitting: "जमा किया जा रहा है...",
    submit_report: "रिपोर्ट जमा करें",
    help_improve_village: "अपने गांव को बेहतर बनाने में मदद करें",
    
    // Home screen
    welcome: "स्वागत है",
    report_issue: "समस्या की रिपोर्ट करें",
    track_complaints: "शिकायतें ट्रैक करें",
    farming_assistance: "कृषि सहायता",
    weather_alerts: "मौसम अलर्ट",
    community_support: "सामुदायिक सहायता",
    voice_assistant: "वॉयस असिस्टेंट",
    speak_request: "कृपया अपना अनुरोध स्पष्ट रूप से बोलें...",
    offline_mode: "आप ऑफलाइन हैं। आपके ऑनलाइन होने पर परिवर्तन सिंक होंगे।",
    
    // Complaint tracking specific
    track_complaints_desc: "अपनी रिपोर्ट की गई समस्याओं की निगरानी करें और उन्हें बढ़ाएं",
    active_complaints: "सक्रिय",
    resolved_complaints: "हल किए गए",
    no_active_complaints: "कोई सक्रिय शिकायत नहीं।",
    issues_will_appear: "आपके द्वारा रिपोर्ट की गई समस्याएं यहां दिखाई देंगी।",
    no_resolved_complaints: "कोई हल की गई शिकायत नहीं।",
    resolved_issues_will_appear: "हल की गई समस्याएं यहां दिखाई देंगी।",
    submitted_status: "जमा किया गया",
    seen_status: "अधिकारी द्वारा देखा गया",
    in_progress_status: "प्रगति पर है",
    near_complete_status: "लगभग पूरा हुआ",
    resolved_status: "हल किया गया",
    unknown_status: "अज्ञात",
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
    
    // Categories
    roads_infrastructure: "सड़कें और बुनियादी ढांचा",
    water_supply: "जल आपूर्ति",
    electricity: "बिजली",
    education: "शिक्षा",
    healthcare: "स्वास्थ्य सेवा",
    domestic_violence: "घरेलू हिंसा",
    other_issues: "अन्य मुद्दे",
    
    // Safety
    quick_exit: "तुरंत बाहर निकलें"
  },
  tamil: {
    // Basic translations for Tamil
    home: "முகப்பு",
    report: "புகார்",
    track: "கண்காணிப்பு",
    farming: "விவசாயம்",
    community: "சமூகம்",
    voice_assistant: "குரல் உதவியாளர்",
    speak_request: "தெளிவாக பேசவும்...",
    // ... more translations can be added later
  },
  telugu: {
    // Basic translations for Telugu
    home: "హోమ్",
    report: "రిపోర్ట్",
    track: "ట్రాక్",
    farming: "వ్యవసాయం",
    community: "సంఘం",
    // ... more translations can be added later
  },
  bengali: {
    // Basic translations for Bengali
    home: "হোম",
    report: "রিপোর্ট",
    track: "ট্র্যাক",
    farming: "কৃষি",
    community: "সম্প্রদায়",
    // ... more translations can be added later
  }
  // Add other languages as needed
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');

  useEffect(() => {
    localStorage.setItem('language', language);
    // Also set preferredLanguage for speech recognition
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const translate = (key: string): string => {
    if (!translations[language]) {
      console.warn(`Translation for language "${language}" not found, falling back to English`);
      return translations['english'][key] || key;
    }
    
    return translations[language][key] || translations['english'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => useContext(LanguageContext);
