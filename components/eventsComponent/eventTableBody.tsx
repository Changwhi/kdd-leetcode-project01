"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SubmitAssignmentModal } from "./submit-assignment-modal";
import { BUTTONS } from "@/text/buttons";
import { CheckToolTip, ExclamationToolTip, XToolTip } from "./Icons/toolTip";
import { createAttendance, deleteAttendance } from "@/lib/actions/attendance";

//TODO: hardcoded, to be changed
const USER_ID = 2;

interface Props {
  event_id: number;
  name: String;
  date: Date;
  topic: String;
  zoomLink: String;
  assignment_submitted: boolean;
  attendance_attended: number;
  pr_submitted: boolean;
}
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ATTENDANCE_STATUS: Record<0 | 1 | 2, JSX.Element> = {
  0: <XToolTip text="Absent" />,
  1: <ExclamationToolTip text="Self-Checkin" />,
  2: <CheckToolTip text="Attend" />,
};

const onClickSelfCheckin = async (exist: number, userId: number, event_id: number) => {
  if(exist) {
    await deleteAttendance(userId, event_id);
  } else {
    await createAttendance(userId, event_id);
  }
  
};

export const EventTableBody: React.FC<Props> = ({
  event_id,
  name,
  date,
  topic,
  zoomLink,
  assignment_submitted,
  attendance_attended,
  pr_submitted,
}) => {
  const isPast: boolean = date <= new Date();

  return (
    <TableRow>
      <TableCell>
        <Col>
          <Row className="text-lg font-bold text-gray-700">
            {name} - {topic}
          </Row>
          <Row className="text-xs font-semi-bold">
            <span className="text-gray-400">
              {date.toLocaleDateString(undefined, options)}
            </span>
            <span className="ml-7">
              <a href={"#"}>See Project details</a>
            </span>
          </Row>
        </Col>
      </TableCell>
      <TableCell>
        {pr_submitted ? (
          <CheckToolTip text="Submit"/>
        ) : (
          <XToolTip text="Unsubmit" />
        )}
      </TableCell>
      <TableCell>
        {ATTENDANCE_STATUS[attendance_attended as 0 | 1 | 2]}
      </TableCell>
      <TableCell>
        <SubmitAssignmentModal
          isPast={isPast}
          eventID={event_id}
          submitted={assignment_submitted}
        ></SubmitAssignmentModal>
      </TableCell>
      <TableCell>
        {" "}
        <div className="flex items-center justify-center text-center">
          <Button
          className="bg-violet-900 w-20"
          disabled={isPast}
          onClick={() => {
            onClickSelfCheckin(attendance_attended, USER_ID, event_id);
          }}
        >
          {attendance_attended && !isPast ? BUTTONS.BUTTON_UNCHECK : BUTTONS.BUTTON_CHECK}
        </Button>
        </div>
        
      </TableCell>
      <TableCell>
        {" "}
        <Button
          className="bg-transparent border-none p-0 font-bold text-black hover:font-black hover:bg-transparent w-20"
          disabled={isPast}
          onClick={() => {
            window.open(zoomLink as string, "_blank");
          }}
        >
          {BUTTONS.BUTTON_JOIN}
        </Button>
      </TableCell>
    </TableRow>
  );
};
