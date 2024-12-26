import React, { createContext, useState, useContext, ReactNode } from "react";

interface Country {
  id: string;
  name: string;
  flag: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  population: number;
}

interface CountContextProps {
  countryCount: number;
  setCountryCount: (count: number) => void;
  selectedCountries: Country[];
  setSelectedCountries: (countries: Country[]) => void;
}

const CountContext = createContext<CountContextProps | undefined>(undefined);

export const CountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countryCount, setCountryCount] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  return (
    <CountContext.Provider value={{ countryCount, setCountryCount, selectedCountries, setSelectedCountries }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};