"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/event";
import moment from "moment";

interface EventModalProps {
  event: EventType;
  trigger: React.ReactNode;
}

export function EventModal({ event, trigger }: EventModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">{event.name}</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{moment(event.date).format("MMMM Do YYYY, h:mm a")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Topic:</span>
            <span>{event.topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Zoom Link:</span>
            <a
              href={event.zoomlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Join Meeting
            </a>
          </div>
          <div className="space-y-2">
            <span className="font-semibold">Assignments:</span>
            <ul className="list-disc pl-5 space-y-1">
              {event.assignments.map(
                (assignment, index) =>
                  assignment && (
                    <li key={index}>
                      {assignment.content.startsWith("http") ? (
                        <a
                          href={assignment.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {`Assignment ${index + 1} Link`}
                        </a>
                      ) : (
                        assignment.content
                      )}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <div className="p-6 pt-0">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
