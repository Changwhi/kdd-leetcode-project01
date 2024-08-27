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
import { retrieveAllEventsIdByGroup, retrieveEventsbyEventAndUser } from "@/lib/actions/eventUser";


// TODO: Change group ID, user ID, it is now hardcoded
const GROUP_ID = 1;
const USER_ID = 2;

export const EventTable= async () => {
  const allEventID = await retrieveAllEventsIdByGroup(GROUP_ID);
  const allEvents = await retrieveEventsbyEventAndUser(allEventID, USER_ID);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2"></TableHead>
          <TableHead className="w-1/12 text-center">{EVENTS_USER.PR}</TableHead>
          <TableHead className="w-1/12 text-center">{EVENTS_USER.ATTENDANCE}</TableHead>
          <TableHead className="w-1/12 text-center">{EVENTS_USER.ASSIGNMENT}</TableHead>
          <TableHead className="w-1/12 text-center">{EVENTS_USER.SELF_CHECKIN}</TableHead>
          <TableHead className="w-1/12 text-center">{EVENTS_USER.ZOOM_LINK}</TableHead>
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
            assignment_submitted={eachEvent.assignment_submitted}
            attendance_attended={eachEvent.attendance_attended}
            pr_submitted={eachEvent.pr_submitted}
          ></EventTableBody>
        ))}
      </TableBody>
    </Table>
  );
};
