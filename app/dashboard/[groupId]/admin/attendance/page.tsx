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
import { SelectEvent } from "@/components/attendance/selectEvents";

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
      <main className="basis-3/4 bg-white lg:w-3/4">
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
      <aside className="basis-1/4 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <SelectEvent
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        ></SelectEvent>

        {/* <div className="mb-6">
          <div className="space-y-4 mt-4">
            <h2 className="text-lg font-bold">{ATTENDANCE.SELECT_EVENTS}</h2>
            {events.map((event, index) => (
              <Card
                key={index}
                className={`p-4 hover:bg-slate-300 hover:cursor-pointer ${
                  selectedEvent?.event_id === event.event_id
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => handleEvent(event)}
              >
                <h1 className="text-lg font-semibold">{event.name}</h1>
                <p className="text-sm">{event.topic}</p>
                <p className="text-xs text-gray-400 text-muted-foreground">
                  {moment(event.date).format("MMMM Do YYYY, h:mm a")}
                </p>
              </Card>
            ))}
          </div>
        </div> */}
      </aside>
    </div>
  );
}
