"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SubmitAssignmentModal } from "./submit-assignment-modal";

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
      <TableCell>{pr_submitted ? <CheckIcon /> : <XIcon />}</TableCell>
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
          className={`${attendanceColour} w-20`}
          disabled={isPast}
          onClick={() => {
            console.log("Check");
          }}
        >
          {!attendance_attended && isPast ? "Absent" : "Attend"}
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

const CheckIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#00C389" />
      <path
        d="M8.75 12.25L10.75 14.25L15.25 9.75"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const XIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#FF5E57" />
      <path
        d="M15 9L9 15M9 9L15 15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
