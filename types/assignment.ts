export interface AssignmentType {
  assignment_id: number;
  title: string;
  content: string;
  event_id: number;
  user_id: number;
}

export interface AssignmentProps {
  title: string;
  content: string;
  event_id: number;
  user_email: string | null | undefined;
  assignmentId: number | null | undefined;
}
