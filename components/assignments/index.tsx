"use client";
import { SUMMARY } from "@/text/summary";
import { Assignment } from "./assignment";
import { SelectEvent } from "./selectEvents";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const Assignments = ({ group_id }: { group_id: number }) => {
  const [allEvents, setAllEvents] = useState([] as EventType[]);
  const [currEventId, setCurrEventId] = useState(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      setIsLoading(true);
      try {
        const events = await retrieveEvents(group_id);
        if (events.length > 0) {
          setAllEvents(events);
          setCurrEventId(events[0].event_id);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEvents();
  }, [group_id]);

  return (
    <>
      <h2 className="text-xl font-bold">{SUMMARY.ASSIGNMENTS_TITLE}</h2>
      {isLoading && <div className="flex items-center justify-center h-5/6"><Loader2 className="h-24 w-24 animate-spin text-gray-500" /></div>}
      {!isLoading && allEvents.length > 0 && (
          <div className="flex flex-col lg:flex-row">
            <aside className="block lg:hidden basis-1/3 lg:w-1/2">
              <SelectEvent
                allEvents={allEvents}
                currEventId={currEventId}
                setCurrEventId={setCurrEventId}
              ></SelectEvent>
            </aside>
            <main className="basis-2/3 p-6 bg-white lg:w-3/4">
              <Assignment eventId={currEventId}></Assignment>
            </main>
            <aside className="hidden lg:block basis-1/3 lg:w-1/2">
              <SelectEvent
                allEvents={allEvents}
                currEventId={currEventId}
                setCurrEventId={setCurrEventId}
              ></SelectEvent>
            </aside>
          </div>
      )}
      {!isLoading && allEvents.length <= 0 && (
        <div className="flex text-xl items-center justify-center h-[70vh]">
          No events has been created.
        </div>
      )}
    </>
  );
};
