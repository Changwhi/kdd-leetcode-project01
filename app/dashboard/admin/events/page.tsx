"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/admin/events/event-card";
import { EventModal } from "@/components/admin/events/create-event-modal";
import { EVENTS } from "@/text/events";
import { BoxIcon } from "@/components/admin/events/icons/boxIcon";

const mockeventsData = [
  {
    title: "Week 1 – Online Mock Interview",
    date: "April 04, 2024",
    description: "Description for Week 1 event.",
    link: "#",
  },
  {
    title: "Week 2 – Online Mock Interview",
    date: "April 11, 2024",
    description: "Description for Week 2 event.",
    link: "#",
  },
  {
    title: "Week 3 – Online Mock Interview",
    date: "April 18, 2024",
    description: "Description for Week 3 event.",
    link: "#",
  },
  {
    title: "Week 3 – Online Mock Interview",
    date: "April 18, 2024",
    description: "Description for Week 3 event.",
    link: "#",
  },
];

export default function Events() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState(mockeventsData);

  const handleSubmit = ({ title, date, description, link }: any) => {
    // Handle form submission
    console.log({ title, date, description, link });
    setEventsData([...eventsData, { title, date, description, link }]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <div className="flex flex-col gap-4 justify-start items-start">
          <h2 className="text-2xl font-bold">{EVENTS.UPCOMMINGEVENTS}</h2>
          <hr className="w-full border-gray-300" />
          <div className="grid grid-cols-2 xl:grid-cols-3 mb-6 gap-5 ">
            {eventsData.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                description={event.description}
                link={event.link}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold">{EVENTS.PASEDEVENTS}</h2>
          <hr className="w-full border-gray-300" />

          <div className="grid grid-cols-2 xl:grid-cols-3 mb-6 gap-6">
            {eventsData.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                description={event.description}
                link={event.link}
              />
            ))}
          </div>
        </div>
      </main>
      <aside className="basis-1/4 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <div className="mb-6">
          <div className="p-4 bg-gray-100 rounded-md">
            <BoxIcon />
            <h2 className="pt-5 text-lg font-bold">{EVENTS.ADDNEWEVENT}</h2>
            <p className="text-sm">{EVENTS.ADDNEWEVENT_DECRIPTION}</p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => setIsCreateModalOpen(true)}
            >
              {EVENTS.CREATENEWEVENT}
            </Button>
          </div>
        </div>
      </aside>
      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        submitFunction={handleSubmit}
      />
    </div>
  );
}
