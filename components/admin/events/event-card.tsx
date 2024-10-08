"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ExternalLinkIcon,
  Trash2,
  Calendar,
  CheckSquare,
  Edit,
  CirclePlus,
} from "lucide-react";
import { EventCardProps } from "@/types/event";
import { EVENTS } from "@/text/events";
import { deleteEvent, updateEvent } from "@/lib/actions/event";
import moment from "moment";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AssignmentInput } from "./assignment-input";

// Character limits for input fields
const charLimits = {
  name: 20,
  topic: 20,
  zoomlink: 200,
  assignment: 200,
};

export const EventCard: React.FC<EventCardProps> = ({
  event_id,
  name,
  date,
  topic,
  zoomlink,
  assignments,
  group_id,
  admin,
}) => {
  const { toast } = useToast();
  const [eventName, setEventName] = useState(name);
  const [eventDate, setEventDate] = useState(moment(date).format("YYYY-MM-DD")); // Extract only the date
  const [eventTime, setEventTime] = useState(moment(date).format("HH:mm")); // Extract only the time
  const [eventTopic, setEventTopic] = useState(topic);
  const [eventZoomlink, setEventZoomlink] = useState(zoomlink);
  const [eventAssignments, setEventAssignments] = useState(
    assignments[0]
      ? assignments.map((assignment) => ({
          id: assignment.assignment_id,
          content: assignment.content,
        }))
      : []
  );
  const [deleteAssignmentIds, setDeleteAssignmentIds] = useState<number[]>([]);
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <Card className="w-full sm:w-64 lg:w-80 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          {admin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Trash2 className="w-5 h-5" />
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
                  action={async () => {
                    await deleteEvent(event_id);
                  }}
                >
                  <DialogClose asChild>
                    <DialogFooter>
                      <Button type="submit" variant="destructive">
                        {EVENTS.REMOVE_BUTTON}
                      </Button>
                    </DialogFooter>
                  </DialogClose>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="flex items-center mt-2 text-sm opacity-90">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDateTime(new Date(date))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">Topic</h3>
        <p className="text-muted-foreground mb-4">{topic}</p>
        <h3 className="font-semibold text-lg mb-2">Assignments</h3>
        <ul className="space-y-2">
          {assignments.map(
            (assignment, index) =>
              assignment && (
                <li key={index} className="flex items-center">
                  <CheckSquare className="w-5 h-5 text-primary mr-2" />
                  <span>
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
                  </span>
                </li>
              )
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
        <Link
          className="text-base text-primary hover:underline inline-flex items-center"
          href={zoomlink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {EVENTS.LINK} <ExternalLinkIcon className="ml-2 h-5 w-5" />
        </Link>
        {admin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" /> {EVENTS.EDIT}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[95vh] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Edit Event
                </DialogTitle>
                <DialogDescription>{EVENTS.EDIT_DESCRIPTION}</DialogDescription>
              </DialogHeader>
              <form
                className="space-y-6"
                action={async () => {
                  const updatedDateTime = moment(
                    `${eventDate}T${eventTime}`
                  ).format();
                  await updateEvent({
                    name: eventName,
                    date: updatedDateTime,
                    topic: eventTopic,
                    zoomlink: eventZoomlink,
                    group_id: group_id,
                    event_id: event_id,
                    deleteAssignmentIds: deleteAssignmentIds,
                    assignments: eventAssignments.filter(
                      (assignment) => !deleteAssignmentIds.includes(assignment.id)
                    ),
                  });
                  setDeleteAssignmentIds([]);
                }}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      {EVENTS.TITLE}
                    </Label>
                    <Input
                      id="title"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      name="name"
                      maxLength={charLimits.name}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {eventName.length}/{charLimits.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium">
                        {EVENTS.DATE}
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-medium">
                        {EVENTS.TIME}
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-sm font-medium">
                      {EVENTS.TOPIC}
                    </Label>
                    <Textarea
                      id="topic"
                      value={eventTopic}
                      onChange={(e) => setEventTopic(e.target.value)}
                      name="topic"
                      maxLength={charLimits.topic}
                      className="w-full min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {eventTopic.length}/{charLimits.topic}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zoomlink" className="text-sm font-medium">
                      {EVENTS.ZOOMLINK}
                    </Label>
                    <Input
                      id="zoomlink"
                      value={eventZoomlink}
                      onChange={(e) => setEventZoomlink(e.target.value)}
                      name="zoomlink"
                      maxLength={charLimits.zoomlink}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {eventZoomlink.length}/{charLimits.zoomlink}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Assignments</h3>
                    {eventAssignments.map((assignment, index) => (
                      <AssignmentInput
                        key={index}
                        index={index}
                        eventAssignments={eventAssignments}
                        setEventAssignments={setEventAssignments}
                        deleteAssignmentIds={deleteAssignmentIds}
                        assignment={assignment}
                        setDeleteAssignmentIds={setDeleteAssignmentIds}
                      />
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" className="w-full sm:w-auto">
                      {EVENTS.SAVE}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};
