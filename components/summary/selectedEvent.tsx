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

export const SelectedEvent = ({ events }: { events: EventType[] }) => {
  const { selectedDate } = useEventContext();
  const [event, setEvent] = useState<EventType[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const targetEvents = events.filter((event) =>
        moment(event.date).isSame(moment(selectedDate), "day")
      );
      setEvent(targetEvents);
    }
  }, [selectedDate]);

  return (
    <>
        <div className="flex flex-col p-4 flex-grow">
          {event[0] && (
              <EventCard
                key={event[0].event_id}
                event_id={event[0].event_id}
                name={event[0].name}
                date={event[0].date}
                topic={event[0].topic}
                zoomlink={event[0].zoomlink}
                group_id={1} assign1={event[0].assign1} assign2={event[0].assign2} assign3={event[0].assign3} />
          )}
          {!event[0] && <p>{SUMMARY.NO_EVENT}</p>}
        </div>
    </>
  );
};
