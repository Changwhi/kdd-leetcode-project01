export interface GroupType {
  group_id: number;
  name: string;
  max_participants: number;
  attendance_deduction: number;
  assignment_deduction: number;
  description: string;
}

export interface UserGroupType {
  user_grou_id: number;
  user_type: number;
  init_amount: number;
  curr_amout: number;
  group_id: number;
  user_id: number;
}

export interface UserGroupProps {
  user_type: number;
  init_amount: number;
  curr_amount: number;
  group_id: number;
  user_id: number;
}

export interface MyGroup {
  group_id: number;
  user_id: number;
  user_group_id: number;
  name: string;
  description: string;
  max_participants: number;
  attendance_deduction: number;
  assignment_deduction: number;
  user_type: number;
}

export interface otherGroup {
  group_id: number;
  name: string;
  description: string;
  user_ids: number[];
  emails: string[];
  user_types: number[];
  user_type: number;
}