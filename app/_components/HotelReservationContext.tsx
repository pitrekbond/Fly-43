"use client";

import { createContext, ReactNode, useState, useContext } from "react";

// Define the shape of the context value
interface HotelReservationContextType {
  hasBreakfast: boolean;
  setHasBreakfast: (value: boolean) => void;
  hasTransfer: boolean;
  setHasTransfer: (value: boolean) => void;
}

// Create the context with `undefined` as the initial value for safety
const HotelReservationContext = createContext<
  HotelReservationContextType | undefined
>(undefined);

// Provider Props Interface
interface HotelReservationProviderProps {
  children: ReactNode;
}

// Context Provider Component
export function HotelReservationProvider({
  children,
}: HotelReservationProviderProps) {
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [hasTransfer, setHasTransfer] = useState(false);

  return (
    <HotelReservationContext.Provider
      value={{
        hasBreakfast,
        setHasBreakfast,
        hasTransfer,
        setHasTransfer,
      }}
    >
      {children}
    </HotelReservationContext.Provider>
  );
}

// Custom Hook for Context
export function useHotelReservation() {
  const context = useContext(HotelReservationContext);
  if (!context) {
    throw new Error(
      "useHotelReservation must be used within a HotelReservationProvider"
    );
  }
  return context;
}
