"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface EventContextType {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <EventContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </EventContext.Provider>
  );
};
