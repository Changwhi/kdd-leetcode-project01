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

  // Detect the user's time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert event dates to the user's local time zone
  const localEventDates = eventdates.map((date) =>
    new Date(date.toLocaleString("en-US", { timeZone: userTimeZone }))
  );

  const modifiers: DayModifiers = {
    highlighted: localEventDates as any,
  };

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
