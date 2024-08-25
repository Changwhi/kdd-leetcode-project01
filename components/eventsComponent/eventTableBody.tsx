"use server";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SubmitAssignmentModal } from "./submit-assignment-modal";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

//TODO: Fetch event data
interface Props {
  name: String;
  date: Date;
  topic: String;
  zoomLink: String;
}
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const EventTableBody: React.FC<Props> = ({
  name,
  date,
  topic,
  zoomLink,
}) => {
  const past = date <= new Date() ? true : false;
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
        <CheckIcon></CheckIcon>
      </TableCell>
      <TableCell>
        <SubmitAssignmentModal></SubmitAssignmentModal>
      </TableCell>
      <TableCell>
        {" "}
        <Button
          className="bg-violet-900 w-20"
          disabled={past}
          // onClick={console.log("Check")}
        >
          Check
        </Button>
      </TableCell>
      <TableCell>
        {" "}
        <Link
          href={zoomLink as Url}
          target="_blank"
          className={past ? "pointer-events-none" : ""}
        >
          <Button className="bg-violet-900 w-20" disabled={past}>
            Link
          </Button>
        </Link>
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
