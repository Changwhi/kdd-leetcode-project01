export interface SubmissionType {
  submission_id: number;
  title: string;
  content: string;
  event_id: number;
  user_id: number;
}

export interface SubmissionCardProps {
  title: string;
  content: string;
  event_id: number;
  user_id: number;
}
