import { SUMMARY } from "@/text/summary";
import { Assignment } from "./assignment";
import { SelectEvent } from "./selectEvents";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";

export const Assignments = async ({ group_id }: { group_id: number }) => {
  const allEvents: EventType[] = await retrieveEvents(group_id);
  let curr_event_id: number =
    allEvents.length > 0 ? allEvents[0].event_id : -1;
  return (
    <>
      <h2 className="text-lg font-bold">{SUMMARY.ASSIGNMENTS_TITLE}</h2>
      <div className="flex flex-col lg:flex-row">
        <aside className="block lg:hidden basis-1/3 lg:w-1/2">
          <SelectEvent allEvents={allEvents}></SelectEvent>
        </aside>
        <main className="basis-2/3 p-6 bg-white lg:pr-6 lg:w-3/4">
          <Assignment event_id={curr_event_id}></Assignment>
        </main>
        <aside className="hidden lg:block basis-1/3 lg:w-1/2">
          <SelectEvent allEvents={allEvents}></SelectEvent>
        </aside>
      </div>
    </>
  );
};
