"use client";
import { Calendar } from "@/components/ui/calendar";
import { retrieveEvents } from "@/lib/actions/event";
import { useEventContext } from "@/lib/context/selectedEventContext";
import { useEffect, useState } from "react";
import { DayModifiers } from "react-day-picker";

/**
 * A reusable calendar component that highlights specific dates and allows for date selection.
 *
 * @param {Date[]} eventdates - An array of dates to be highlighted on the calendar
 * @return {JSX.Element} A JSX element representing the calendar component
 */
export const CalendarTool = ({ group_id}: { group_id: number }) => {
  const { selectedDate, setSelectedDate } = useEventContext();
  const [eventDates, setEventDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchEventDates = async () => {
      try {
        const response = await retrieveEvents(group_id);
        if (response) {
          const eventdates = response.map((event) => new Date(event.date));
          setEventDates(eventdates);
        }
      } catch (error) {
        console.error("Error retrieving events:", error);
      }
    }
    fetchEventDates();
  }, [group_id]);

  // Create a modifiers object where each date in the dummy array is marked
  const modifiers: DayModifiers = {
    highlighted: eventDates as any,
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
