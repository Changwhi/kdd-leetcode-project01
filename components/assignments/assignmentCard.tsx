"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CONSTANTS } from "@/text/summary";

interface Props {
  userName: String;
  date: Date;
  title: String;
  content: String;
}
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const AssignmentCard: React.FC<Props> = ({
  userName,
  date,
  title,
  content,
}) => {
  return (
    <Card className="flex justify-between items-center p-4 mb-4 shadow-md">
      <Col>
        <Row className="text-m font-bold text-gray-700">
          {userName} - {title}
        </Row>
        <Row className="text-xs text-gray-400">
          {date.toLocaleDateString(undefined, options)}
        </Row>
      </Col>
      <Col>
        <Button className="bg-violet-900 m-2 w-20" variant="default" size="sm">
          <a href="#">{CONSTANTS.BUTTON_VIEW}</a>
        </Button>
      </Col>
    </Card>
  );
};
