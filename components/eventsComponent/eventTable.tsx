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


// TODO: Change group ID, not it is hardcoded
const GROUP_ID = 1;

export const EventTable= async () => {
  const allEventID = await retrieveAllEventsIdByGroup(GROUP_ID);
  const allEvents = await retrieveEventsbyEventAndUser(allEventID, 2);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2"></TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.PR}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ASSIGNMENT}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ATTENDANCE}</TableHead>
          <TableHead className="w-1/12">{EVENTS_USER.ZOOM_LINK}</TableHead>
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
            attendance_exists={eachEvent.attendance_exists}
            pr_exists={eachEvent.pr_exists}
          ></EventTableBody>
        ))}
      </TableBody>
    </Table>
  );
};
