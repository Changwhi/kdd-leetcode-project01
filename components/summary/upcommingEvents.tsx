"use server";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SUMMARY } from "@/text/summary";
import moment from "moment-timezone"; // Use moment-timezone to handle time zones
import { EventType } from "@/types/event";
import { EventModal } from "./detailModal";
import Row from "react-bootstrap/Row";

const localTimezone = moment.tz.guess(); // Automatically guess the user's local time zone

export const UpcommingEvents = ({ events }: { events: EventType[] }) => {
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
    <div className="container mx-auto pt-5 pb-10 bg-slate-50 rounded-xl w-full">
      <div className="items-center mb-4">
        <Row className="text-m font-bold md:m-2 lg:m-4">
          {SUMMARY.UPCOMING_EVENTS_TITLE}
        </Row>
        <Row className="overflow-y-auto">
          {events.length > 0 &&
            events.map((event, index) => (
              <Card
                className={`items-between p-4 m-3 shadow-md transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:shadow-lg`}
                key={event.event_id}
              >
                <EventModal
                  event={event}
                  trigger={
                    <div className="items-center">
                      <Row className="text-m font-bold text-gray-700">
                        {event.name} - {event.topic}
                      </Row>
                      <Row className="text-xs text-gray-400">
                        {/* {moment
                          .utc(event.date) // Start with UTC date
                          .tz(localTimezone) // Convert to the user's local time zone
                          .format("MMMM Do YYYY, h:mm a")}{" "} */}
                        {/* Format in local time */}
                        {formatDateTime(new Date(event.date))}
                      </Row>
                      <span className="text-blue-500 text-sm cursor-pointer hover:underline">
                        {SUMMARY.SEE_PROJECT_DETAILS}
                      </span>
                    </div>
                  }
                />
              </Card>
            ))}
        </Row>
      </div>
      {events.length === 0 && (
        <p className="text-muted-foreground">{SUMMARY.NO_UPCOMING_EVENTS}</p>
      )}
    </div>
  );
};
