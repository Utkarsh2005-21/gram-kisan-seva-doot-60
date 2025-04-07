
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SafetyContextProps {
  trustedContacts: TrustedContact[];
  addTrustedContact: (contact: TrustedContact) => void;
  removeTrustedContact: (id: string) => void;
  emergencyExit: () => void;
  sendSOS: () => void;
  isSosActive: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const SafetyContext = createContext<SafetyContextProps>({
  trustedContacts: [],
  addTrustedContact: () => {},
  removeTrustedContact: () => {},
  emergencyExit: () => {},
  sendSOS: () => {},
  isSosActive: false,
});

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([]);
  const [isSosActive, setIsSosActive] = useState(false);
  
  // Load trusted contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem("trustedContacts");
    if (savedContacts) {
      setTrustedContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save trusted contacts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("trustedContacts", JSON.stringify(trustedContacts));
  }, [trustedContacts]);

  const addTrustedContact = (contact: TrustedContact) => {
    setTrustedContacts([...trustedContacts, contact]);
  };

  const removeTrustedContact = (id: string) => {
    setTrustedContacts(trustedContacts.filter(contact => contact.id !== id));
  };

  const emergencyExit = () => {
    // Redirect to a safe site like Google or weather
    window.location.href = "https://www.google.com";
  };

  const sendSOS = () => {
    setIsSosActive(true);
    
    // In a real app, this would send SMS or notifications to trusted contacts
    console.log("SOS sent to trusted contacts", trustedContacts);
    
    // For demo purposes, we'll just show the SOS active status for 5 seconds
    setTimeout(() => {
      setIsSosActive(false);
    }, 5000);
  };

  return (
    <SafetyContext.Provider value={{ 
      trustedContacts, 
      addTrustedContact, 
      removeTrustedContact,
      emergencyExit,
      sendSOS,
      isSosActive
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = (): SafetyContextProps => useContext(SafetyContext);
