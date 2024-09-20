"use server";
import { Button } from "@/components/ui/button";
import { SUMMARY } from "@/text/summary";
import { UpcommingEvents } from "./upcommingEvents";
import moment from "moment";
import { retrieveEvents } from "@/lib/actions/event";
import { retrieveAllUsers } from "@/lib/actions/summary";
import { SelectedEvent } from "./selectedEvent";
import { CalendarTool } from "./calendar";
import { EventProvider } from "@/lib/context/selectedEventContext";
import SummaryTable from "./summaryTable";

export const Summary = async ({
  group_id,
  admin,
}: {
  group_id: number;
  admin: boolean;
}) => {
  const users = await retrieveAllUsers({ group_id });
  const events = await retrieveEvents(group_id);
  const eventdates = events.map((event) => new Date(event.date));
  const upcomingEvents = events.filter((event) =>
    moment(event.date).isAfter(moment())
  );

  return (
    <EventProvider>
      <div className="flex flex-col min-h-full lg:flex-row">
        <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{SUMMARY.TITLE}</h1>
            </div>
          </div>
          <div className="mb-6">
            <UpcommingEvents events={upcomingEvents} />
          </div>
          <div className="overflow-x-auto mt-5">
            <h1 className="text-lg font-bold">{SUMMARY.TABLE_TITLE}</h1>
            <SummaryTable usersInGroup={users} />
          </div>
        </main>
        <aside className="basis-1/4 w-1/2 xl:w-80 bg-slate-50 p-6 rounded-xl">
          <div className="mb-6 w-full">
            <CalendarTool eventdates={eventdates} />
          </div>
          <div className="mt-6">
            <SelectedEvent
              givenEvents={events}
              group_id={group_id}
              admin={admin}
            />
          </div>
        </aside>
      </div>
    </EventProvider>
  );
};
