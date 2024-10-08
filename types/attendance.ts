type UserType = 0 | 1
type DepositStatus = "Received" | "Pending" | "Returned"

export interface AttendanceType {
  user_group_id: number;
  user_type: UserType
  avatar: string;
  init_amount: number;
  curr_amount: number;
  user_id: number;
  event_id: number;
  name: string;
  email: string;
  attended: number;
  submission_id: number;
  submitted: boolean;
  deposit_status: DepositStatus;
  group_id: number;
  init_deduction: number;
}
