export interface EventType {
  event_id: number;
  name: string;
  date: Date;
  topic: string;
  zoomlink: string;
}

export interface EventCardProps {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
}

export interface EventIdType {
  event_id: number;
}

export interface EventAttendacePrType {
  event_id: number;
  name: string;
  date: Date;
  topic: string;
  zoomlink: string;
  attendance_exists: number;
  pr_exists: number;
}