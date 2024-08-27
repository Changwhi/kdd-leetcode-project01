"use client";
import { Button } from "@/components/ui/button";
import { EventCardProps } from "@/types/event";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
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
import { EVENTS } from "@/text/events";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { deleteEvent, updateEvent } from "@/lib/actions/event";
import { useState } from "react";

export const EventCard: React.FC<EventCardProps> = ({
  event_id,
  name,
  date,
  topic,
  zoomlink,
  assign1,
  assign2,
  assign3,
}) => {
  const formattedDate = date.toISOString().split("T")[0];
  const [eventName, setEventName] = useState(name);
  const [eventDate, setEventDate] = useState(formattedDate);
  const [eventTopic, setEventTopic] = useState(topic);
  const [eventZoomlink, setEventZoomlink] = useState(zoomlink);
  const [eventAssign1, setEventAssign1] = useState(assign1);
  const [eventAssign2, setEventAssign2] = useState(assign2);
  const [eventAssign3, setEventAssign3] = useState(assign3);

    const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <Card className="w-80 max-w-md shadow-lg hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size={"sm"}>
                <XIcon className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{EVENTS.REMOVE}</DialogTitle>
                <DialogDescription>
                  {EVENTS.REMOVE_DESCRIPTION}
                </DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4"
                action={async (formData: FormData) => {
                  await deleteEvent(event_id);
                }}
              >
                <DialogClose asChild>
                  <DialogFooter>
                    <Button type="submit">{EVENTS.REMOVE_BUTTON}</Button>
                  </DialogFooter>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="pt-3 text-sm text-muted-foreground">
          {formatDateTime(new Date(date))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{topic}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-primary" />
            <span>{assign1}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-primary" />
            <span>{assign2}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-primary" />
            <span>{assign3}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={zoomlink}
          target="_blank"
          className="text-sm text-primary hover:underline"
          prefetch={false}
        >
          {EVENTS.LINK}
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size={"sm"}>
              {EVENTS.EDIT}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit le</DialogTitle>
              <DialogDescription>{EVENTS.EDIT_DESCRIPTION}</DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              action={async (formData: FormData) => {
                await updateEvent({
                  name: eventName,
                  date: eventDate,
                  topic: eventTopic,
                  zoomlink: eventZoomlink,
                  group_id: 1,
                  event_id: event_id,
                  assign1: eventAssign1,
                  assign2: eventAssign2,
                  assign3: eventAssign3,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    {EVENTS.TITLE}
                  </Label>
                  <Input
                    id="title"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="col-span-3"
                    name="name"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    {EVENTS.DATE}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="topic" className="text-right">
                    {EVENTS.TOPIC}
                  </Label>
                  <Input
                    id="topic"
                    value={eventTopic}
                    onChange={(e) => setEventTopic(e.target.value)}
                    className="col-span-3"
                    name="topic"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zoomlink" className="text-right">
                    {EVENTS.ZOOMLINK}
                  </Label>
                  <Input
                    id="zoomlink"
                    value={eventZoomlink}
                    onChange={(e) => setEventZoomlink(e.target.value)}
                    className="col-span-3"
                    name="zoomlink"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assign1" className="text-right">
                    {EVENTS.ASSGINMENT_1}
                  </Label>
                  <Input
                    id="assign1"
                    value={eventAssign1}
                    onChange={(e) => setEventAssign1(e.target.value)}
                    className="col-span-3"
                    name="assign1"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assign2" className="text-right">
                    {EVENTS.ASSGINMENT_2}
                  </Label>
                  <Input
                    id="assign2"
                    value={eventAssign2}
                    onChange={(e) => setEventAssign2(e.target.value)}
                    className="col-span-3"
                    name="assign2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assign3" className="text-right">
                    {EVENTS.ASSGINMENT_3}
                  </Label>
                  <Input
                    id="assign3"
                    value={eventAssign3}
                    onChange={(e) => setEventAssign3(e.target.value)}
                    className="col-span-3"
                    name="assign3"
                  />
                </div>
              </div>
              <DialogClose asChild>
                <DialogFooter>
                  <Button type="submit">{EVENTS.SAVE}</Button>
                </DialogFooter>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
