"use server";
import { EVENTS } from "@/text/events";
import { EventTable } from "@/components/eventsComponent/eventTable";

export default async function SummaryPage() {
  return (    <>
    <h2 className="text-lg font-bold">{EVENTS.UPCOMINGEVENTS}</h2>
    <div className="space-y-4 mt-4">
      <EventTable></EventTable>
    </div>
  </>)
}
