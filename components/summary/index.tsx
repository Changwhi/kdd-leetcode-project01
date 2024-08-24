"use server";
import { Button } from "@/components/ui/button";
import { SUMMARY } from "@/text/summary";
import { SummaryTable } from "./summaryTable";
import { UpcommingEvents } from "./upcommingEvents";
import moment from "moment";
import { retrieveEvents } from "@/lib/actions/event";
import { retrieveAllUsers } from "@/lib/actions/summary";
import { SelectedEvent } from "./selectedEvent";
import { CalendarTool } from "./calendar";
import { EventProvider } from "@/lib/context/selectedEventContext";

export const Summary = async () => {
  const users = await retrieveAllUsers({ group_id: 1 });
  const events = await retrieveEvents();
  const eventdates = events.map((event) => new Date(event.date));
  const upcomingEvents = events.filter((event) =>
    moment(event.date).isAfter(moment())
  );

  return (
    <EventProvider>
      <div className="flex flex-col min-h-full lg:flex-row">
        <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">{SUMMARY.TITLE}</h1>
            </div>
          </div>
          <div className="overflow-x-auto">
            <h1 className="text-base font-semibold">{SUMMARY.TABLE_TITLE}</h1>
            <SummaryTable users={users} />
          </div>
          <div className="mt-6">
            <h1 className="text-base font-semibold">{SUMMARY.EVENT_TITLE}</h1>
            <SelectedEvent events={events} />
          </div>
        </main>
        <aside className="basis-1/4 w-1/2 xl:w-80 bg-slate-50 p-6 rounded-xl">
          <div className="mb-6 w-full">
            <CalendarTool eventdates={eventdates} />
          </div>
          <div className="mb-6">
            <UpcommingEvents events={upcomingEvents} />
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-bold">{SUMMARY.CHOOSE_DATE_TITLE}</h2>
            <p className="text-muted-foreground">
              {SUMMARY.CHOOSE_DATE_DESCRIPTION}
            </p>
            <Button variant="default" className="mt-4">
              {SUMMARY.VIEW_TIPS_BUTTON}
            </Button>
          </div>
        </aside>
      </div>
    </EventProvider>
  );
};
