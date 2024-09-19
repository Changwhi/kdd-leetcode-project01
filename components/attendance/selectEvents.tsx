"use client";
import { Card } from "@/components/ui/card";
import { EventType } from "@/types/event";
import { ATTENDANCE } from "@/text/attendance";
import moment from "moment";

interface SelectEventProps {
  events: EventType[];
  selectedEvent: EventType | undefined;
  setSelectedEvent: (currEvent: EventType) => void;
}

export const SelectEvent: React.FC<SelectEventProps> = ({
  events,
  selectedEvent,
  setSelectedEvent,
}) => {
  const handleEvent = (event: EventType) => {
    if (selectedEvent === event) return;
    setSelectedEvent(event);
  };

  return (
    <div className="bg-slate-50 md:p-2 md:mt-4 lg:p-4 rounded-xl lg:h-[81vh] md:w-full md:h-[40vh]">

        <h2 className="text-m font-bold md:m-2 lg:m-4">
          {ATTENDANCE.SELECT_EVENTS}
        </h2>
        <div className="md:h-[80%] lg:h-[68vh] overflow-y-auto">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`p-4 m-3 shadow-md hover:bg-slate-300 hover:cursor-pointer ${
                selectedEvent?.event_id === event.event_id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleEvent(event)}
            >
              <h1 className="text-lg font-semibold">{event.name}</h1>
              <p className="text-sm">{event.topic}</p>
              <p className="text-xs text-gray-400 text-muted-foreground">
                {moment(event.date).format("MMMM Do YYYY, h:mm a")}
              </p>
            </Card>
          ))}
        </div>
    </div>
  );
};
