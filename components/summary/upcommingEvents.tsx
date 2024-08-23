import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CONSTANTS } from "@/text/summary";
import moment from "moment";
import { retrieveEvents } from "@/lib/actions/event";
import { useEffect, useState } from "react";
import { EventType } from "@/types/event";

export const UpcommingEvents = () => {
  const currentDate = moment();
  const [eventsData, setEventsData] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveEvents();
        if (!response) {
          return;
        }
        const upcommingEvents = response.filter((event) =>
          moment(event.date).isAfter(currentDate)
        );
        setEventsData(upcommingEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-bold">{CONSTANTS.UPCOMING_EVENTS_TITLE}</h2>
      {eventsData.map((event, index) => (
        <Card key={index} className="p-4">
          <h3 className="text-sm font-semibold">{event.name}</h3>
          <p className="text-muted-foreground">
            {moment(event.date).format("MMMM Do YYYY, h:mm a")}
          </p>
          <Link
            href={event.zoomlink}
            className="text-blue-500"
            prefetch={false}
          >
            {CONSTANTS.SEE_PROJECT_DETAILS}
          </Link>
        </Card>
      ))}
    </div>
  );
};
