"use server";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EVENTS_USER } from "@/text/events";
import { EventTableBody } from "./eventTableBody";

// TODO: Fetch events list
const tempEvents = [
  {
    eventId: "114",
    name: "Week4",
    date: new Date(2024, 8, 22),
    topic: "Binary Tree",
    zoomLink: "https://soopark.netlify.app/",
  },
  {
    eventId: "113",
    name: "Week3",
    date: new Date(2024, 7, 15),
    topic: "Bitwise",
    zoomLink: "https://soopark.netlify.app/",
  },
  {
    eventId: "112",
    name: "Week2",
    date: new Date(2024, 7, 11),
    topic: "Heap",
    zoomLink: "https://soopark.netlify.app/",
  },
  {
    eventId: "111",
    name: "Week1",
    date: new Date(2024, 7, 1),
    topic: "Graph",
    zoomLink: "https://soopark.netlify.app/",
  },
];

export const EventTable= () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2"></TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.PR}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ASSIGNMENT}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ATTENDANCE}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ZOOM_LINK}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tempEvents.map((eachEvent) => (
          <EventTableBody
            key={eachEvent.eventId}
            name={eachEvent.name}
            date={eachEvent.date}
            topic={eachEvent.topic}
            zoomLink={eachEvent.zoomLink}
          ></EventTableBody>
        ))}
      </TableBody>
    </Table>
  );
};
