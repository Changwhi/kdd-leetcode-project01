"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";
import moment from "moment";
import Attendance from "@/components/attendance";
import { SelectEvent } from "@/components/assignments/selectEvents";

/**
 * This component renders a page for viewing attendance of a given event.
 * It fetches all events of the given group and displays them in a list.
 * When an event is selected from the list, it fetches the attendance data
 * for the selected event and displays it in a table.
 * @param {params} - An object containing a groupId property, which is the id of the group to fetch events and attendance for.
 * @returns A JSX element representing the page.
 */
export default function AttendancePage({
  params,
}: {
  params: { groupId: string };
}) {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<EventType>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [currEventId, setCurrEventId] = useState<number>(-1);

  // Fetch the events on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventList = await retrieveEvents(Number(params.groupId));
        setEvents(eventList);
        if (eventList.length > 0) {
          setSelectedEvent(eventList[0]);
          setCurrEventId(eventList[0].event_id);
        }
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    fetchData();
  }, [params.groupId, toast]);

  // Update selectedEvent when currEventId changes
  useEffect(() => {
    if (currEventId !== null) {
      const newSelectedEvent = events.find(
        (event) => event.event_id === currEventId
      );
      setSelectedEvent(newSelectedEvent);
    }
  }, [currEventId, events]);

  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <aside className="block lg:hidden basis-1/3 lg:w-1/2">
        <SelectEvent
          allEvents={events}
          currEventId={currEventId}
          setCurrEventId={setCurrEventId}
        ></SelectEvent>
      </aside>
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{selectedEvent?.name}</h1>
            <p className="text-muted-foreground">
              {moment(selectedEvent?.date).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
        <Attendance
          event_id={selectedEvent?.event_id ?? 0}
          group_id={Number(params.groupId)}
        />
      </main>
      <aside className="hidden lg:block basis-1/3 lg:w-1/2">
        <SelectEvent
          allEvents={events}
          currEventId={currEventId}
          setCurrEventId={setCurrEventId}
        ></SelectEvent>
      </aside>
    </div>
  );
}
