export interface AttendanceType {
    attendance_id: number;
    user_id: number;
    event_id: number;
    attended: number;
    date: Date;
    user_group_id: number;
    user_type: number;
    init_amount: number;
    curr_amount: number;
    group_id: number;
    name: string;
    email: string;
}