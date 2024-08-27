"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SubmitAssignmentModal } from "./submit-assignment-modal";
import { BUTTONS } from "@/text/buttons";
import { CheckToolTip, ExclamationToolTip, XToolTip } from "./Icons/toolTip";
import { XIcon } from "./Icons/xIcon";
import { CheckIcon } from "./Icons/checkIcon";
import { ExclamationIcon } from "./Icons/exclamationIcon";

//TODO: Fetch event data
interface Props {
  event_id: number;
  name: String;
  date: Date;
  topic: String;
  zoomLink: String;
  assignment_submitted: boolean;
  attendance_attended: boolean;
  pr_submitted: boolean;
}
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
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
  const isPast: boolean = date <= new Date() ? true : false;
  const attendanceColour: string =
    attendance_attended || !isPast ? "bg-violet-900" : "bg-orange-500";

  const ATTENDANCE_STATUS = {
    0: <XToolTip text="Absent" />,
    1: <ExclamationToolTip text="Self-Checkin" />,
    2: <CheckToolTip text="Attend" />,
  };

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
          <CheckToolTip text="Submit" />
        ) : (
          <XToolTip text="Unsubmit" />
        )}
      </TableCell>
      <TableCell>
        {attendance_attended ? (
          <ExclamationToolTip text="checkin" />
        ) : (
          <XToolTip text="Absent" />
        )}
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
        <Button
          className="bg-violet-900 w-20"
          disabled={isPast}
          onClick={() => {
            console.log("Check");
          }}
        >
          {BUTTONS.BUTTON_CHECK}
        </Button>
      </TableCell>
      <TableCell>
        {" "}
        <Button
          className="bg-violet-900 w-20"
          disabled={isPast}
          onClick={() => {
            window.open(zoomLink as string, "_blank");
          }}
        >
          Link
        </Button>
      </TableCell>
    </TableRow>
  );
};
