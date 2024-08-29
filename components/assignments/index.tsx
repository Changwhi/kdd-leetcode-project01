"use client";
import { SUMMARY } from "@/text/summary";
import { Assignment } from "./assignment";
import { SelectEvent } from "./selectEvents";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";
import { useEffect, useState } from "react";

export const Assignments = ({ group_id }: { group_id: number }) => {
  const [allEvents, setAllEvents] = useState([] as EventType[]);
  const [currEventId, setCurrEventId] = useState(-1);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const events = await retrieveEvents(group_id);
      if (events.length > 0) {
        setAllEvents(events);
        setCurrEventId(events[0].event_id);
      }
    };

    fetchAllEvents();
  }, [group_id]);

  return (
    <>
      <h2 className="text-lg font-bold">{SUMMARY.ASSIGNMENTS_TITLE}</h2>
      <div className="flex flex-col lg:flex-row">
        <aside className="block lg:hidden basis-1/3 lg:w-1/2">
          <SelectEvent allEvents={allEvents} setCurrEventId={setCurrEventId}></SelectEvent>
        </aside>
        <main className="basis-2/3 p-6 bg-white lg:pr-6 lg:w-3/4">
          <Assignment eventId={currEventId}></Assignment>
        </main>
        <aside className="hidden lg:block basis-1/3 lg:w-1/2">
          <SelectEvent allEvents={allEvents} setCurrEventId={setCurrEventId}></SelectEvent>
        </aside>
      </div>
    </>
  );
};
