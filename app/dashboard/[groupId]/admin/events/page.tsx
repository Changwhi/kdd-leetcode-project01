"use server";
import { EventCard } from "@/components/admin/events/event-card";
import { EVENTS } from "@/text/events";
import { BoxIcon } from "@/components/admin/events/icons/boxIcon";
import { retrieveEvents } from "@/lib/actions/event";
import moment from "moment";
import { CreateEventModal } from "@/components/admin/events/create-event-modal";

export default async function Events({
  params
}: {
  params: { groupId: string };
}) {
  const currentDate = moment();
  const events = await retrieveEvents(Number(params.groupId));
  const upcommingEvents = events.filter((event) =>
    moment(event.date).isAfter(currentDate)
  );
  const pastEvents = events.filter((event) =>
    moment(event.date).isBefore(currentDate)
  );


  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 bg-white lg:w-3/4">
        <div className="flex flex-col gap-4 justify-center items-start">
          <h2 className="self-start text-xl font-bold">
            {EVENTS.UPCOMINGEVENTS}
          </h2>
          <hr className="w-full border-gray-300" />
          <div className="flex flex-row items-start justify-start flex-wrap mb-6 gap-5 ">
            {upcommingEvents.map((event, index) => (
              <EventCard
                key={event.event_id}
                event_id={event.event_id}
                name={event.name}
                date={event.date}
                topic={event.topic}
                zoomlink={event.zoomlink}
                assignments={event.assignments}
                group_id={Number(params.groupId)}
                admin={true}
              />
            ))}
          </div>
          <h2 className="self-start text-xl font-bold">
            {EVENTS.PASEDEVENTS}
          </h2>
          <hr className="w-full border-gray-300" />
          <div className="flex flex-row items-start justify-start flex-wrap mb-6 gap-5 ">
            {pastEvents.map((event, index) => (
              <EventCard
                key={event.event_id}
                event_id={event.event_id}
                name={event.name}
                date={event.date}
                topic={event.topic}
                zoomlink={event.zoomlink}
                assignments={event.assignments}
                group_id={Number(params.groupId)}
                admin={true}
              />
            ))}
          </div>
        </div>
      </main>
      <aside className="basis-1/4 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <div className="mb-6">
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="pb-10">
              <BoxIcon />
              <h2 className="pt-5 text-lg font-bold">{EVENTS.ADDNEWEVENT}</h2>
              <p className="text-sm">{EVENTS.ADDNEWEVENT_DECRIPTION}</p>
            </div>
            <CreateEventModal groupId={Number(params.groupId)}/>
          </div>
        </div>
      </aside>
    </div>
  );
}
