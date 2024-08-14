import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { CONSTANTS } from "@/text/summary";
import { useEffect, useState } from "react";
import { SummaryTable } from "./summaryTable";
import { Assignments } from "./assignments";

const eventsData = [
  {
    title: "Week 1 – Online Mock Interview",
    date: "April 04, 2024",
    link: "#",
  },
  {
    title: "Week 2 – Online Mock Interview",
    date: "April 04, 2024",
    link: "#",
  },
  {
    title: "Week 3 – Online Mock Interview",
    date: "April 04, 2024",
    link: "#",
  },
];
export const UpcommingEvents = () => {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-bold">{CONSTANTS.UPCOMING_EVENTS_TITLE}</h2>
      {eventsData.map((event, index) => (
        <Card key={index} className="p-4">
          <h3 className="text-sm font-semibold">{event.title}</h3>
          <p className="text-muted-foreground">{event.date}</p>
          <Link href={event.link} className="text-blue-500" prefetch={false}>
            {CONSTANTS.SEE_PROJECT_DETAILS}
          </Link>
        </Card>
      ))}
    </div>
  );
};
