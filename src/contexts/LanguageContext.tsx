
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Available languages in the application
export type LanguageCode = "english" | "hindi" | "tamil" | "telugu" | "bengali" | "marathi" | "gujarati" | "punjabi";

// Language context interface
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translate: (key: string) => string;
}

// Default context value
const defaultContext: LanguageContextType = {
  language: "english",
  setLanguage: () => {},
  translate: (key) => key,
};

// Create the context
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Translations for each supported language
const translations: Record<LanguageCode, Record<string, string>> = {
  english: {
    "welcome": "Welcome!",
    "report_issue": "Report an Issue",
    "track_complaints": "Track Your Complaints",
    "farming_assistance": "Farming Assistance",
    "weather_alerts": "Weather Alerts",
    "community_support": "Community Support",
    "settings": "Settings",
    "home": "Home",
    "track": "Track",
    "farming": "Farming",
    "community": "Community",
    "voice_assistant": "Voice Assistant Activated",
    "speak_request": "Please speak your request...",
    "offline_mode": "Offline Mode - Your actions will sync when you're back online",
    "language_changed": "Language Changed",
    "language_updated": "Your language preference has been updated.",
  },
  hindi: {
    "welcome": "स्वागत है!",
    "report_issue": "समस्या की रिपोर्ट करें",
    "track_complaints": "अपनी शिकायतों को ट्रैक करें",
    "farming_assistance": "कृषि सहायता",
    "weather_alerts": "मौसम अलर्ट",
    "community_support": "सामुदायिक सहायता",
    "settings": "सेटिंग्स",
    "home": "होम",
    "track": "ट्रैक",
    "farming": "खेती",
    "community": "समुदाय",
    "voice_assistant": "वॉयस असिस्टेंट सक्रिय",
    "speak_request": "कृपया अपना अनुरोध बोलें...",
    "offline_mode": "ऑफलाइन मोड - आप ऑनलाइन होने पर आपके कार्य सिंक होंगे",
    "language_changed": "भाषा बदल गई",
    "language_updated": "आपकी भाषा प्राथमिकता अपडेट कर दी गई है।",
  },
  tamil: {
    "welcome": "வரவேற்கிறோம்!",
    "report_issue": "பிரச்சினையை புகாரளிக்க",
    "track_complaints": "உங்கள் புகார்களை கண்காணிக்க",
    "farming_assistance": "விவசாய உதவி",
    "weather_alerts": "வானிலை எச்சரிக்கைகள்",
    "community_support": "சமூக ஆதரவு",
    "settings": "அமைப்புகள்",
    "home": "முகப்பு",
    "track": "கண்காணி",
    "farming": "விவசாயம்",
    "community": "சமூகம்",
    "voice_assistant": "குரல் உதவியாளர் செயல்படுத்தப்பட்டது",
    "speak_request": "உங்கள் கோரிக்கையை பேசவும்...",
    "offline_mode": "ஆஃப்லைன் பயன்முறை - நீங்கள் ஆன்லைனில் இருக்கும்போது உங்கள் செயல்கள் ஒத்திசைக்கப்படும்",
    "language_changed": "மொழி மாற்றப்பட்டது",
    "language_updated": "உங்கள் மொழி விருப்பம் புதுப்பிக்கப்பட்டது.",
  },
  telugu: {
    "welcome": "స్వాగతం!",
    "report_issue": "సమస్యను నివేదించండి",
    "track_complaints": "మీ ఫిర్యాదులను ట్రాక్ చేయండి",
    "farming_assistance": "వ్యవసాయ సహాయం",
    "weather_alerts": "వాతావరణ హెచ్చరికలు",
    "community_support": "కమ్యూనిటీ సపోర్ట్",
    "settings": "సెట్టింగ్‌లు",
    "home": "హోమ్",
    "track": "ట్రాక్",
    "farming": "వ్యవసాయం",
    "community": "సమాజం",
    "voice_assistant": "వాయిస్ అసిస్టెంట్ యాక్టివేట్ చేయబడింది",
    "speak_request": "దయచేసి మీ అభ్యర్థనను మాట్లాడండి...",
    "offline_mode": "ఆఫ్‌లైన్ మోడ్ - మీరు ఆన్‌లైన్‌లో ఉన్నప్పుడు మీ చర్యలు సింక్ అవుతాయి",
    "language_changed": "భాష మార్చబడింది",
    "language_updated": "మీ భాషా ప్రాధాన్యత నవీకరించబడింది.",
  },
  bengali: {
    "welcome": "স্বাগতম!",
    "report_issue": "সমস্যা রিপোর্ট করুন",
    "track_complaints": "আপনার অভিযোগ ট্র্যাক করুন",
    "farming_assistance": "কৃষি সহায়তা",
    "weather_alerts": "আবহাওয়া সতর্কতা",
    "community_support": "কমিউনিটি সমর্থন",
    "settings": "সেটিংস",
    "home": "হোম",
    "track": "ট্র্যাক",
    "farming": "কৃষি",
    "community": "সম্প্রদায়",
    "voice_assistant": "ভয়েস অ্যাসিস্ট্যান্ট সক্রিয় করা হয়েছে",
    "speak_request": "অনুগ্রহ করে আপনার অনুরোধ বলুন...",
    "offline_mode": "অফলাইন মোড - আপনি অনলাইনে থাকলে আপনার কার্যগুলি সিঙ্ক হবে",
    "language_changed": "ভাষা পরিবর্তন করা হয়েছে",
    "language_updated": "আপনার ভাষা পছন্দ আপডেট করা হয়েছে।",
  },
  marathi: {
    "welcome": "स्वागत आहे!",
    "report_issue": "समस्येची तक्रार करा",
    "track_complaints": "तुमच्या तक्रारींचा मागोवा घ्या",
    "farming_assistance": "शेती सहाय्य",
    "weather_alerts": "हवामान अलर्ट",
    "community_support": "समुदाय समर्थन",
    "settings": "सेटिंग्ज",
    "home": "होम",
    "track": "ट्रॅक",
    "farming": "शेती",
    "community": "समुदाय",
    "voice_assistant": "व्हॉइस असिस्टंट सक्रिय केला",
    "speak_request": "कृपया तुमची विनंती बोला...",
    "offline_mode": "ऑफलाइन मोड - तुम्ही ऑनलाइन असताना तुमच्या क्रिया सिंक होतील",
    "language_changed": "भाषा बदलली",
    "language_updated": "तुमची भाषा प्राधान्य अद्यतनित केली गेली आहे.",
  },
  gujarati: {
    "welcome": "સ્વાગત છે!",
    "report_issue": "સમસ્યાની જાણ કરો",
    "track_complaints": "તમારી ફરિયાદોને ટ્રૅક કરો",
    "farming_assistance": "ખેતી સહાય",
    "weather_alerts": "હવામાન એલર્ટ્સ",
    "community_support": "સમુદાય સમર્થન",
    "settings": "સેટિંગ્સ",
    "home": "હોમ",
    "track": "ટ્રૅક",
    "farming": "ખેતી",
    "community": "સમુદાય",
    "voice_assistant": "વૉઇસ આસિસ્ટન્ટ સક્રિય કર્યું",
    "speak_request": "કૃપા કરીને તમારી વિનંતી બોલો...",
    "offline_mode": "ઑફલાઇન મોડ - તમે ઑનલાઇન હશો ત્યારે તમારી ક્રિયાઓ સિંક થશે",
    "language_changed": "ભાષા બદલાઈ",
    "language_updated": "તમારી ભાષા પસંદગી અપડેટ કરવામાં આવી છે.",
  },
  punjabi: {
    "welcome": "ਜੀ ਆਇਆਂ ਨੂੰ!",
    "report_issue": "ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
    "track_complaints": "ਆਪਣੀਆਂ ਸ਼ਿਕਾਇਤਾਂ ਨੂੰ ਟਰੈਕ ਕਰੋ",
    "farming_assistance": "ਖੇਤੀਬਾੜੀ ਸਹਾਇਤਾ",
    "weather_alerts": "ਮੌਸਮ ਅਲਰਟ",
    "community_support": "ਕਮਿਊਨਿਟੀ ਸਹਿਯੋਗ",
    "settings": "ਸੈਟਿੰਗਜ਼",
    "home": "ਹੋਮ",
    "track": "ਟਰੈਕ",
    "farming": "ਖੇਤੀਬਾੜੀ",
    "community": "ਕਮਿਊਨਿਟੀ",
    "voice_assistant": "ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਐਕਟੀਵੇਟ ਕੀਤਾ ਗਿਆ",
    "speak_request": "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਬੇਨਤੀ ਬੋਲੋ...",
    "offline_mode": "ਆਫਲਾਈਨ ਮੋਡ - ਤੁਹਾਡੇ ਆਨਲਾਈਨ ਹੋਣ 'ਤੇ ਤੁਹਾਡੀਆਂ ਕਾਰਵਾਈਆਂ ਸਿੰਕ ਹੋ ਜਾਣਗੀਆਂ",
    "language_changed": "ਭਾਸ਼ਾ ਬਦਲੀ ਗਈ",
    "language_updated": "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਪਸੰਦ ਅਪਡੇਟ ਕੀਤੀ ਗਈ ਹੈ।",
  },
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem("preferredLanguage") as LanguageCode) || "english";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  // Translation function
  const translate = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return key; // Fallback to the key itself if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
