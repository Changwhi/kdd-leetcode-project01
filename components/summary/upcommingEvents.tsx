"use server"
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SUMMARY } from "@/text/summary";
import moment from "moment";
import { EventType } from "@/types/event";
import { EventModal } from "./detailModal";

export const UpcommingEvents = ({events}: {events: EventType[]}) => {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-bold">{SUMMARY.UPCOMING_EVENTS_TITLE}</h2>
      {events.length > 0 && events.map((event, index) => (
        <Card key={index} className="p-4">
          <h3 className="text-sm font-semibold">{event.name}</h3>
          <p className="text-muted-foreground">
            {moment(event.date).format("MMMM Do YYYY, h:mm a")}
          </p>
          <EventModal 
            event={event} 
          />
        </Card>
      ))}
      {events.length === 0 && (
        <p className="text-muted-foreground">
          {SUMMARY.NO_UPCOMING_EVENTS}
        </p>
      )}
    </div>
  );
};
