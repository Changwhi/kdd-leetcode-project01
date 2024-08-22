// components/admin/events/EventCard.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DetailEventModal } from "./detail-event-modal";
import { EventCardProps } from "@/types/event";

export const EventCard: React.FC<EventCardProps> = ({
  event_id,
  name,
  date,
  topic,
  zoomlink,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg min-w-full max-w-xs mx-auto hover:shadow-xl transition-all duration-200">
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-semibold hover:text-gray-700 duration-200">
            {name}
          </h2>
          <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">
            {date.toString()}
          </h3>
          <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200 flex-grow">
            {topic}
          </p>
        </div>
        <div className="flex flex-col items-center mt-4 space-x-2">
          <Button
            onClick={() => setIsDetailModalOpen(true)}
            className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200"
            size="sm"
          >
            Detail
          </Button>
          <a
            className="text-muted-foreground underline"
            href={zoomlink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {zoomlink}
          </a>
        </div>
      </div>
      <DetailEventModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        info={{
          title: name,
          date: date,
          description: topic,
          link: zoomlink,
        }}
      />
    </div>
  );
};
