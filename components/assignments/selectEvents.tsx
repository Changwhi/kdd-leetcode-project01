"use client";
import { CONSTANTS } from "@/text/summary";
import { Card } from "@/components/ui/card";
import Row from "react-bootstrap/Row";

// TODO: Fetch events list
const tempEvents = [
  {
    eventId: "1",
    name: "Week4",
    date: new Date(2024, 7, 22),
    topic: "Binary Tree",
  },
  {
    eventId: "2",
    name: "Week3",
    date: new Date(2024, 7, 15),
    topic: "Bitwise",
  },
  {
    eventId: "3",
    name: "Week2",
    date: new Date(2024, 7, 11),
    topic: "Heap",
  },
  {
    eventId: "4",
    name: "Week1",
    date: new Date(2024, 7, 1),
    topic: "Graph",
  },
];

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SelectEvent = () => {
  return (
    <div className="bg-slate-50 md:p-2 md:mt-4 lg:p-4 rounded-xl lg:h-[83vh] md:w-full md:h-[40vh]">
      <Row className="text-m font-bold md:m-2 lg:m-4">{CONSTANTS.SELECT_EVENT_TITLE}</Row>
      <Row className="md:h-[80%] lg:h-[70vh] overflow-y-auto">
        {tempEvents.map((event) => (
          <Card className="items-center p-4 m-3 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer" key={event.eventId} onClick={()=>{console.log(event.eventId
          )}}>
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
