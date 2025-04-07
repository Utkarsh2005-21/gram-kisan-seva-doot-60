
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface UserData {
  name: string;
  mobileNumber: string;
  location: string;
  language: string;
}

interface UserContextProps {
  userData: UserData | null;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  isLoggedIn: boolean;
}

const defaultUserData: UserData = {
  name: '',
  mobileNumber: '',
  location: '',
  language: 'english'
};

const UserContext = createContext<UserContextProps>({
  userData: null,
  updateUserData: () => {},
  clearUserData: () => {},
  isLoggedIn: false
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setLanguage } = useLanguage();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData) as UserData;
      setUserData(parsedData);
      setIsLoggedIn(true);
      
      // Set language based on user preference
      if (parsedData.language) {
        setLanguage(parsedData.language);
      }
    }
  }, [setLanguage]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => {
      const updatedData = { ...prev, ...data } as UserData;
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const clearUserData = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      clearUserData,
      isLoggedIn
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => useContext(UserContext);
