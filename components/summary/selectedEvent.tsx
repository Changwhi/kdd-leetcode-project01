"use client";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/event";
import { EVENTS } from "@/text/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEventContext } from "@/lib/context/selectedEventContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { SUMMARY } from "@/text/summary";
import { EventCard } from "../admin/events/event-card";

export const SelectedEvent = ({ givenEvents, group_id }: { givenEvents: EventType[], group_id:number }) => {
  const { selectedDate } = useEventContext();
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const targetEvents = givenEvents.filter((event) =>
        moment(event.date).isSame(moment(selectedDate), "day")
      );
      setEvents(targetEvents);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="flex flex-col p-4 flex-grow">
        {events &&
          events.map((event) => (
            <EventCard
              key={event.event_id}
              event_id={event.event_id}
              name={event.name}
              date={event.date}
              topic={event.topic}
              zoomlink={event.zoomlink}
              group_id={group_id}
              assign1={event.assign1}
              assign2={event.assign2}
              assign3={event.assign3}
            />
          ))}
        {!events && <p>{SUMMARY.NO_EVENT}</p>}
      </div>
    </>
  );
};
