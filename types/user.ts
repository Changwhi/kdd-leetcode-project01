export interface UserType {
  user_id: number;
  name: string;
  email: string;
  picture: string;
}

export interface UserRoleType {
  user_id: number;
  group_id: number;
  user_type: number;
}