"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEventContext } from "@/lib/context/selectedEventContext";
import { DayModifiers } from "react-day-picker";

/**
 * A reusable calendar component that highlights specific dates and allows for date selection.
 *
 * @param {Date[]} eventdates - An array of dates to be highlighted on the calendar
 * @return {JSX.Element} A JSX element representing the calendar component
 */
export const CalendarTool = ({ eventdates }: { eventdates: Date[] }) => {
  const { selectedDate, setSelectedDate } = useEventContext();

  // Create a modifiers object where each date in the dummy array is marked
  const modifiers: DayModifiers = {
    highlighted: eventdates as any,
  };

  // Style for highlighted dates
  const modifiersStyles = {
    highlighted: {
      background: "#6d9ec9",
      borderRadius: "50%", 
    },
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="border rounded-md bg-white"
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  );
};
