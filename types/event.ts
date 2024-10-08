import { AssignmentType } from "./assignment";

export interface EventType {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  processed: boolean;
  assignments: AssignmentType[];
}

export interface EventCardProps {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  admin: boolean;
  assignments: AssignmentType[];
}
export interface EventCardPropsForDB {
  event_id: number;
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  assignments: {id:number, content:string}[];
  deleteAssignmentIds: number[];
  newAssignments: string[];
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
  assignments: AssignmentType[]; 
}
