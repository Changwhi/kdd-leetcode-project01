export interface Event {
  event_id: number;
  event_name: string;
  pullRequest: boolean;
  attendance: number | null;  // Can be 0 (Absent), 1 (Late), 2 (Attended)
  assignments: string[];  
  deposit: number;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  deposit_status: 'Pending' | 'Received' | 'Returned' | null; 
  events: Event[];  // List of events related to this user
  avatar: string;
  curr_amount: number;
}