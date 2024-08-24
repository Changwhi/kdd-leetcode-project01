"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEventContext } from "@/lib/context/selectedEventContext";
import { DayModifiers } from "react-day-picker";

export const CalendarTool = ({ eventdates }: { eventdates: Date[] }) => {
  const { selectedDate, setSelectedDate } = useEventContext();

  // Create a modifiers object where each date in the dummy array is marked
  const modifiers: DayModifiers = {
    highlighted: eventdates as any,
  };

  // Style for highlighted dates
  const modifiersStyles = {
    highlighted: {
      border: "#5203fc 2px solid",
    },
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="border rounded-md"
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  );
};
