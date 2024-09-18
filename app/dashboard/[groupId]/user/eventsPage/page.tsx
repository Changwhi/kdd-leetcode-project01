"use server";
import { EVENTS } from "@/text/events";
import { EventTable } from "@/components/eventsComponent/eventTable";

export default async function EventPage({
  params,
}: {
  params: { groupId: string };
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">{EVENTS.UPCOMINGEVENTS}</h2>
      <div className="space-y-4">
        <EventTable group_id={Number(params.groupId)} history={true}></EventTable>
      </div>
      <h2 className="text-lg font-bold mt-10">{EVENTS.HISTORYEVENTS}</h2>
      <div className="space-y-4">
        <EventTable group_id={Number(params.groupId)} history={false}></EventTable>
      </div>
    </div>
  );
}
