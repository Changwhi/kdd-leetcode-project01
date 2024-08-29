"use client";
import { SUMMARY } from "@/text/summary";
import { Card } from "@/components/ui/card";
import Row from "react-bootstrap/Row";
import { EventType } from "@/types/event";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface SelectEventProps {
  allEvents: EventType[];
  setCurrEventId: (eventId: number) => void;
}

export const SelectEvent: React.FC<SelectEventProps> = ({
  allEvents,
  setCurrEventId,
}) => {
  return (
    <div className="bg-slate-50 md:p-2 md:mt-4 lg:p-4 rounded-xl lg:h-[78vh] md:w-full md:h-[40vh]">
      <Row className="text-m font-bold md:m-2 lg:m-4">
        {SUMMARY.SELECT_EVENT_TITLE}
      </Row>
      <Row className="md:h-[80%] lg:h-[65vh] overflow-y-auto">
        {allEvents.map((event) => (
          <Card
            className="items-center p-4 m-3 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
            key={event.event_id}
            onClick={() => {
              setCurrEventId(event.event_id);
            }}
          >
            <Row className="text-m font-bold text-gray-700">
              {event.name} - {event.topic}
            </Row>
            <Row className="text-xs text-gray-400">
              {event.date.toLocaleDateString(undefined, options)}
            </Row>
          </Card>
        ))}
      </Row>
    </div>
  );
};
