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
SELECT * 
FROM user_group
LEFT JOIN "user" ON "user".user_id = user_group.user_id
left join attendance on "user".user_id = attendance.user_id and attendance.event_id = ${event_id}
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
