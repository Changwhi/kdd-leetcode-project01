import { Card } from "@/components/ui/card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AssignmentViewModal } from "./assignmentViewModal";

interface Props {
  userName: string;
  date: Date;
  title: string;
  content: string;
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
        <AssignmentViewModal
          userName={userName}
          date={date}
          title={title}
          content={content}
        />
      </Col>
    </Card>
  );
};
