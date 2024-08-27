export interface AttendanceType {
  user_group_id: number;
  user_type: number;
  init_amount: number;
  curr_amout: number;
  user_id: number;
  event_id: number;
  name: string;
  email: string;
  attended: number;
  submission_id: number;
  submitted: boolean;
}
