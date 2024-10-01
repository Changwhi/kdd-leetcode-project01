"use server";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EVENTS_USER } from "@/text/events";
import { EventTableBody } from "./eventTableBody";
import {
  retrieveUpcomingEventsIdByGroup,
  retrievePastEventsIdByGroup,
  retrieveEventsbyEventAndUserEmail
} from "@/lib/actions/eventUser";
import { getSession } from '@auth0/nextjs-auth0';

export const EventTable = async ({
  group_id,
  history,
}: {
  group_id: number;
  history: boolean;
}) => {
  const session = await getSession();
  const user_email = session?.user.email;
  const allEventID = history
    ? await retrieveUpcomingEventsIdByGroup(group_id)
    : await retrievePastEventsIdByGroup(group_id);
  const allEvents = await retrieveEventsbyEventAndUserEmail(allEventID, user_email);

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2"></TableHead>
            <TableHead className="w-1/12 text-center">
              {EVENTS_USER.PR}
            </TableHead>
            <TableHead className="w-1/12 text-center">
              {EVENTS_USER.ATTENDANCE}
            </TableHead>
            <TableHead className="w-1/12 text-center">
              {EVENTS_USER.ASSIGNMENT}
            </TableHead>
            <TableHead className="w-1/12 text-center">
              {EVENTS_USER.ZOOM_LINK}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEvents.map((eachEvent) => (
            <EventTableBody
              key={eachEvent.event_id}
              event_id={eachEvent.event_id}
              name={eachEvent.name}
              date={eachEvent.date}
              topic={eachEvent.topic}
              zoomLink={eachEvent.zoomlink}
              assign={eachEvent.assignments}
              assignment_submitted={eachEvent.assignment_submitted}
              attendance_attended={eachEvent.attendance_attended}
              pr_submitted={eachEvent.pr_submitted}
            ></EventTableBody>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
