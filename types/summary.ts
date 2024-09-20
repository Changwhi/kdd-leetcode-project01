export interface Event {
  event_id: number;
  event_name: string;
  pullRequest: boolean;
  attendance: number | null;  // Can be 0 (Absent), 1 (Late), 2 (Attended)
  assignments: string[];  // Array of assignment strings
  deposit: number;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  deposit_status: 'Pending' | 'Received' | 'Returned' | null;  // Replace with your actual status options
  events: Event[];  // List of events related to this user
  avatar: string;
}
