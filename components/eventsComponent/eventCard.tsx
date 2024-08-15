"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

export const EventCard: React.FC<Props> = ({ name, date, topic, zoomLink }) => {
  return (
    <Card className="flex justify-between items-center p-4">
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
      <Col>
        <Button className="bg-violet-900 m-2 w-20" variant="default" size="sm" asChild>
          <a href={"#"}>Submit</a>
        </Button>
        <Button className="bg-violet-900 m-2 w-20" variant="default" size="sm" asChild>
          <a href={"#"}>Check</a>
        </Button>
        <Button className="bg-violet-900 m-2 w-20" variant="default" size="sm" asChild>
          <a href={"#"}>Join</a>
        </Button>
      </Col>
    </Card>
  );
};
