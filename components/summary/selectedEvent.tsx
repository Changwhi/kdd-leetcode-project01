"use client";
import { EventType } from "@/types/event";

import { useEventContext } from "@/lib/context/selectedEventContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { SUMMARY } from "@/text/summary";
import { EventCard } from "../admin/events/event-card";

export const SelectedEvent = ({
  givenEvents,
  group_id,
  admin,
}: {
  givenEvents: EventType[];
  group_id: number;
  admin: boolean;
}) => {
  const { selectedDate } = useEventContext();
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const targetEvents = givenEvents.filter((event) =>
        moment(event.date).isSame(moment.utc(selectedDate).local(), "day")
      );
      setEvents(targetEvents);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="flex flex-col  flex-grow">
        {events && events.length > 0 && (
          <h1 className="my-6 text-base font-semibold">
            {SUMMARY.EVENT_TITLE}
          </h1>
        )}
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
              admin={admin}
              assignments={event.assignments}
            />
          ))}
        {!events && <p>{SUMMARY.NO_EVENT}</p>}
      </div>
    </>
  );
};
