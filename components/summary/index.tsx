"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { CONSTANTS } from "@/text/summary";
import { useEffect, useState } from "react";
import { SummaryTable } from "./summaryTable";
import { Assignments } from "./assignments";
import { UpcommingEvents } from "./upcommingEvents";
import { DayModifiers } from "react-day-picker";
import moment from "moment";
import { retrieveEvents } from "@/lib/actions/event";
import { useToast } from "../ui/use-toast";
export const Summary = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [markedEvents, setMarkedEvents] = useState<Date[]>([]);
  

  useEffect(() => {
    const getAllEvents= async () => {
      try {
        const response = await retrieveEvents();
        if (!response) {
          return;
        }
        setMarkedEvents(response.map((event) => new Date(event.date)));
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    getAllEvents();
  }, []);

   
  // Create a modifiers object where each date in the dummy array is marked
  const modifiers: DayModifiers = {
    highlighted: markedEvents as any,
  };

  // Style for highlighted dates
  const modifiersStyles = {
    highlighted: {
      color: "blue",
    },
  };
  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{CONSTANTS.TITLE}</h1>
            <p className="text-muted-foreground">{CONSTANTS.DATE}</p>
          </div>
          <Button variant="ghost" size="icon">
            <ExpandIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <SummaryTable />
        </div>
        <div className="mt-6">
          <Assignments />
        </div>
      </main>
      <aside className="basis-1/4 w-1/2 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <div className="mb-6 w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="border rounded-md"
          />
        </div>
        <div className="mb-6">
          <UpcommingEvents />
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-bold">{CONSTANTS.CHOOSE_DATE_TITLE}</h2>
          <p className="text-muted-foreground">
            {CONSTANTS.CHOOSE_DATE_DESCRIPTION}
          </p>
          <Button variant="default" className="mt-4">
            {CONSTANTS.VIEW_TIPS_BUTTON}
          </Button>
        </div>
      </aside>
    </div>
  );
};

function ExpandIcon(props: any) {
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
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
}
