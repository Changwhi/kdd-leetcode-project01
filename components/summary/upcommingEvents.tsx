"use server";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SUMMARY } from "@/text/summary";
import moment from "moment";
import { EventType } from "@/types/event";
import { EventModal } from "./detailModal";
import Row from "react-bootstrap/Row";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const UpcommingEvents = ({ events }: { events: EventType[] }) => {
  return (
    <div className="container mx-auto pt-5 pb-10 bg-slate-50 rounded-xl w-ful">
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
                        {/* {event.date.toLocaleDateString(undefined, options)} */}
                        {moment
                          .utc(event.date)
                          .local()
                          .format("MMMM Do YYYY, h:mm a")}
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
