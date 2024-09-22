"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/event";
import moment from "moment";
import { BUTTONS } from "@/text/buttons";
import { SUMMARY } from "@/text/summary";

interface EventModalProps {
  event: EventType;
}

export function EventModal({ event }: EventModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-blue-500 cursor-pointer hover:underline">
          {SUMMARY.SEE_PROJECT_DETAILS}
        </span>
      </DialogTrigger>
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
              <li>{event.assign1}</li>
              <li>{event.assign2}</li>
              <li>{event.assign3}</li>
            </ul>
          </div>
        </div>
        <DialogDescription />
        <DialogClose asChild>
          <DialogFooter className="p-6 pt-0">
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
              {BUTTONS.BUTTON_CLOSE}
            </Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
