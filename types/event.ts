export interface EventType {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  assign1: string;
  assign2: string;
  assign3: string;
  processed: boolean;
}

export interface EventCardProps {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  admin: boolean;
  assign1: string;
  assign2: string;
  assign3: string;
}
export interface EventCardPropsForDB {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  assign1: string;
  assign2: string;
  assign3: string;
}
export interface EventIdType {
  event_id: number;
  group_id: number;
}

export interface EventAttendacePrType {
  event_id: number;
  name: string;
  date: Date;
  topic: string;
  zoomlink: string;
  assignment_submitted: boolean;
  attendance_attended: number;
  pr_submitted: boolean;
  group_id: number;
  assign1: string;
  assign2: string;
  assign3: string;
}
