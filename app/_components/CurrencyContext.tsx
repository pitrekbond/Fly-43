"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type CurrencyProviderProps = {
  children: ReactNode;
};

type CurrencyContextType = {
  currency: string;
  toggleCurrency: () => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState("€"); // Default currency is Euro

  function toggleCurrency() {
    setCurrency((c) => (c === "€" ? "$" : "€"));
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrency must be used within a CurrencyContextProvider"
    );
  }
  return context;
}
