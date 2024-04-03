"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { EventFilterContextType } from "./event-filter.types";

// Context for this is not necessary, but it's a good example of how to use React Context

export const EventFilterContext = createContext<EventFilterContextType>({
  filters: ["upcoming"],
} as EventFilterContextType);

export const EventFilterProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState<string[]>(["upcoming"]);
  return (
    <EventFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </EventFilterContext.Provider>
  );
};

export const useEventFilter = () => useContext(EventFilterContext);
