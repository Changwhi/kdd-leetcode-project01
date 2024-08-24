"use client";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/event";
import { EVENTS } from "@/text/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEventContext } from "@/lib/context/selectedEventContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { SUMMARY } from "@/text/summary";

export const SelectedEvent = ({ events }: { events: EventType[] }) => {
  const { selectedDate } = useEventContext();
  const [event, setEvent] = useState<EventType[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const targetEvents = events.filter((event) =>
        moment(event.date).isSame(moment(selectedDate), "day")
      );
      setEvent(targetEvents);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg min-w-full max-w-xs mx-auto hover:shadow-xl transition-all duration-200">
        <div className="flex flex-col p-4 flex-grow">
          {event[0] && (
            <>
              <div className="flex flex-col flex-grow p-4">
                <h2 className="h-6 overflow-y-hidden text-base font-semibold hover:text-gray-700 duration-200">
                  {event[0]?.name}
                </h2>
                <hr className="w-full border-gray-300" />
                <h3 className="text-xs text-gray-400 hover:text-gray-600 transition-all duration-200">
                  {moment(event[0]?.date).format("MMMM Do YYYY, h:mm a")}
                </h3>
                <p className="h-16 text-sm mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200 flex-grow">
                  {event[0]?.topic}
                </p>
              </div>
              <div className="flex flex-raw justify-between items-center mt-2 space-x-2">
                <a
                  className="text-sm text-muted-foreground underline"
                  href={event[0]?.zoomlink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {EVENTS.LINK}
                </a>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit le</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save whenre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <h2 className="mr-4 font-bold">Event Name : </h2>
                          <p>{event[0]?.name}</p>
                        </div>
                        <div className="flex flex-row">
                          <h2 className="mr-4 font-bold">Date : </h2>
                          <p>{event[0]?.topic}</p>
                        </div>
                        <div className="flex flex-row">
                          <h2 className="mr-4 font-bold">Description : </h2>
                          <p>{event[0]?.topic}</p>
                        </div>
                        <div className="flex flex-row">
                          <h2 className="mr-4 font-bold">Link : </h2>
                          <p>{event[0]?.zoomlink}</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
          {!event[0] && <p>{SUMMARY.NO_EVENT}</p>}
        </div>
      </div>
    </>
  );
};
