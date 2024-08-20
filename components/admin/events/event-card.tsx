// components/admin/events/EventCard.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DetailEventModal } from "./detail-event-modal";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  link: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  link,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg min-w-full max-w-xs mx-auto hover:shadow-xl transition-all duration-200">
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-semibold hover:text-gray-700 duration-200">
            {title}
          </h2>
          <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">
            {date}
          </h3>
          <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200 flex-grow">
            {description}
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
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        </div>
      </div>
      <DetailEventModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        info={{
          title: title,
          date: date,
          description: description,
          link: link,
        }}
      />
    </div>
  );
};
