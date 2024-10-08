"use server"

import { UpcommingEvents } from "./upcommingEvents"
import moment from "moment"
import { retrieveEvents } from "@/lib/actions/event"
import { retrieveAllUsers } from "@/lib/actions/summary"
import { SelectedEvent } from "./selectedEvent"
import { CalendarTool } from "./calendar"
import { EventProvider } from "@/lib/context/selectedEventContext"
import SummaryTable from "./summaryTable"
import InvitationButton from "./invitationButton"

export const Summary = async ({
  group_id,
  admin,
}: {
  group_id: number
  admin: boolean
}) => {
  const users = await retrieveAllUsers({ group_id })
  const events = await retrieveEvents(group_id)
  const eventdates = events.map((event) => new Date(event.date))
  const upcomingEvents = events.filter((event) =>
    moment(event.date).isAfter(moment())
  )

  return (
    <EventProvider>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between min-h-full">
        <main className="flex-grow p-4 md:p-6 bg-white md:max-w-[calc(100%-320px)] xl:max-w-[calc(100%-384px)] 2xl:max-w-[calc(100%-448px)]">
          <UpcommingEvents events={upcomingEvents} />
          <div className="overflow-x-auto mt-5">
            <SummaryTable usersInGroup={users} />
          </div>
        </main>
        <aside className="w-full lg:w-80 bg-slate-50 p-6 rounded-xl lg:flex-shrink-0">
          <CalendarTool eventdates={eventdates} />
          <SelectedEvent
            givenEvents={events}
            group_id={group_id}
            admin={admin}
          />
          <InvitationButton group_id={group_id} />
        </aside>
      </div>
    </EventProvider>
  )
}