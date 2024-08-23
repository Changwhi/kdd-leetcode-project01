"use server";
import { AttendanceType } from "@/types/attendance";
import { sql } from "@/utils/db";

export const retrieveAttendance = async ({
  event_id,
}: {
  event_id: number;
}) => {
  try {
    const response = await sql`
SELECT user_group_id, user_type, init_amount, curr_amout, user_group.user_id, "user".name, "user".email, attendance.attended,  submission_id
FROM user_group
LEFT JOIN "user" ON "user".user_id = user_group.user_id
left join attendance on "user".user_id = attendance.user_id and attendance.event_id = ${event_id}
left join "event" on "event".event_id = attendance.event_id
left join submission on submission.user_id = "user".user_id and submission.event_id = "event".event_id
WHERE user_group.group_id = 1;
    `;

    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
