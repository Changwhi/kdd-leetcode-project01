export interface AssignmentType {
  assignment_id: number;
  content: string;
  number: number;
  event_id: number;
  user_id: number;
}

export interface AssignmentProps {
  content: string;
  event_id: number;
  number: number;
  user_email: string | null | undefined;
  assignment_id: number | null | undefined;
}
