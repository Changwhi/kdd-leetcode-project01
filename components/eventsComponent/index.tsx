import { CONSTANTS } from "@/text/summary";
import { EventTable } from "./eventTable";

export const EventsComponent = () => {
  return (
    <>
      <h2 className="text-lg font-bold">{CONSTANTS.UPCOMING_EVENTS_TITLE}</h2>
      <div className="space-y-4 mt-4">
        <EventTable></EventTable>
      </div>
    </>
  );
};
