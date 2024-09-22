export interface SubmissionType {
  submission_id: number;
  title: string;
  date: Date;
  content: string;
  event_id: number;
  user_id: number;
}

export interface SubmissionUserNameType {
  submission_id: number;
  title: string;
  date: Date;
  content: string;
  event_id: number;
  user_id: number;
  user_name: string;
}

export interface SubmissionCardProps {
  title: string;
  content: string;
  event_id: number;
  user_email: string | null | undefined;
}
