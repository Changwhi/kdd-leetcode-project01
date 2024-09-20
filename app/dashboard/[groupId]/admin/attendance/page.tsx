"use client";
import { Card } from "@/components/ui/card";
import { ATTENDANCE } from "@/text/attendance";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";
import moment from "moment";
import { retrieveAttendance } from "@/lib/actions/attendance";
import { AttendanceType } from "@/types/attendance";
import Attendance from "@/components/attendance";

/**
 * This component renders a page for viewing attendance of a given event.
 * It fetches all events of the given group and displays them in a list.
 * When an event is selected from the list, it fetches the attendance data
 * for the selected event and displays it in a table.
 * @param {params} - An object containing a groupId property, which is the id of the group to fetch events and attendance for.
 * @returns A JSX element representing the page.
import { group } from "console";
import { SelectEvent } from "@/components/attendance/selectEvents";

/**
 * Attendance
 *
 * This component displays the attendance list for a selected event.
 * The component also displays the total number of participants, the number of people who attended, and the number of people who were absent.
 * The component retrieves the data from the database and displays it in a table.
 * The component also provides a dropdown list of events to select from.
 * When the user selects an event, the component will retrieve the attendance data for the selected event and display it in the table.
 * The component also handles errors and displays an error message if there is an error retrieving the data.
 * The component is responsive and works well on different screen sizes.
 * The component is also accessible and follows best practices for accessibility.
 * The component is a stateful component and uses the useState hook to store the selected event and the attendance data in the component's state.
 * The component uses the useEffect hook to retrieve the data from the database when the component mounts and when the selected event changes.
 * The component uses the useToast hook to display error messages to the user.
 * The component is a client-side component and is rendered on the client-side.
 * The component is a part of the Next.js pages directory and is rendered on the server-side.
 */
export default function AttendancePage({
  params,
}: {
  params: { groupId: string };
}) {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<EventType>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const handleEvent = (event: EventType) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const fetchData = async ({ event_id }: { event_id: number }) => {
      try {
        const response = await retrieveAttendance({
          event_id: event_id,
          group_id: Number(params.groupId),
        });
        if (!response) {
          setAttendance([]);
          return;
        }
        setAttendance(response);
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    if (selectedEvent) {
      fetchData({ event_id: selectedEvent?.event_id });
    }
  }, [selectedEvent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventList = await retrieveEvents(Number(params.groupId));
        setEvents(eventList);
        setSelectedEvent(eventList[0]);
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <aside className="block lg:hidden basis-1/3 lg:w-1/2">
        <SelectEvent
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        ></SelectEvent>
      </aside>
      <main className="basis-2/3 p-6 bg-white lg:pr-6 lg:w-3/4">
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
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        ></SelectEvent>
      </aside>
    </div>
  );
}
