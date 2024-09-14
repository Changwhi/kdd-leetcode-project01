"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SubmitAssignmentModal } from "./submit-assignment-modal";
import { BUTTONS } from "@/text/buttons";
import { CheckToolTip, ExclamationToolTip, XToolTip } from "./Icons/toolTip";
import {
  createAttendanceWithUserEmail,
  deleteAttendanceWithUserEmail,
} from "@/lib/actions/attendance";
import { EventDetailModal } from "./event-detail-modal";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  event_id: number;
  name: String;
  date: Date;
  topic: String;
  zoomLink: String;
  assign1: String;
  assign2: String;
  assign3: String;
  assignment_submitted: boolean;
  attendance_attended: number;
  pr_submitted: boolean;
}
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ATTENDANCE_STATUS: Record<0 | 1 | 2 | 3, JSX.Element> = {
  0: <XToolTip text="Absent" />,
  1: <XToolTip text="Self_checkin" />,
  2: <ExclamationToolTip text="Late" />,
  3: <CheckToolTip text="Attend" />,
};

const onClickSelfCheckin = async (exist: number, user_email:string|null|undefined, event_id: number) => {
  if (user_email) {
    if (exist) {
      await deleteAttendanceWithUserEmail(user_email, event_id);
    } else {
      await createAttendanceWithUserEmail(user_email, event_id);
    }
  }
};

export const EventTableBody: React.FC<Props> = ({
  event_id,
  name,
  date,
  topic,
  zoomLink,
  assign1,
  assign2,
  assign3,
  assignment_submitted,
  attendance_attended,
  pr_submitted,
}) => {
  const { user } = useUser();
  const userEmail = user?.email;
  const isPast: boolean = date <= new Date();
  const assignmentColour: string = assignment_submitted
    ? "bg-violet-900"
    : "bg-red-500";

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
            <EventDetailModal
              name={name}
              topic={topic}
              date={date}
              assign1={assign1}
              assign2={assign2}
              assign3={assign3}
            />
          </Row>
        </Col>
      </TableCell>
      <TableCell>
        {pr_submitted ? (
          <CheckToolTip text="Submit" />
        ) : (
          <XToolTip text="Unsubmit" />
        )}
      </TableCell>
      <TableCell>
        {ATTENDANCE_STATUS[attendance_attended as 0 | 1 | 2 | 3]}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center text-center">
          {isPast ? (
            <Button disabled className={`${assignmentColour} w-20`}>
              {assignment_submitted
                ? BUTTONS.BUTTON_SUBMITTED
                : BUTTONS.BUTTON_UNSUBMITTED}
            </Button>
          ) : (
            <SubmitAssignmentModal
              eventID={event_id}
              submitted={assignment_submitted}
            ></SubmitAssignmentModal>
          )}
        </div>
      </TableCell>
      <TableCell>
        {" "}
        <div className="flex items-center justify-center text-center">
          <Button
            className="bg-violet-900 w-20"
            disabled={isPast || [2, 3].includes(attendance_attended)}
            onClick={() => {
              onClickSelfCheckin(attendance_attended, userEmail, event_id);
            }}
          >
            {attendance_attended === 1 && !isPast
              ? BUTTONS.BUTTON_UNCHECK
              : BUTTONS.BUTTON_CHECK}
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
