"use server";
import { AttendanceType } from "@/types/attendance";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";
/**
 * Retrieves attendance information for a specific group.
 *
 * @param {number} event_id - The ID of the event for which to retrieve attendance information.
 * @return {AttendanceType[]} An array of attendance information for the specified event.
 */
export const retrieveAttendance = async ({
  event_id,
  group_id = 1,
}: {
  event_id: number | undefined;
  group_id?: number | undefined;
}) => {
  try {
    if (!event_id || !group_id) {
      return [];
    }
    const response: AttendanceType[] = await sql`
SELECT user_group_id, user_type, init_amount, curr_amount, user_group.user_id, "user".name, "user".email, attendance.attended, "user".user_id, "event".event_id, submission_id, pr.submitted
FROM user_group
LEFT JOIN "user" ON "user".user_id = user_group.user_id
left join attendance on "user".user_id = attendance.user_id and attendance.event_id = ${event_id}
left join "event" on "event".event_id = attendance.event_id
left join submission on submission.user_id = "user".user_id and submission.event_id = "event".event_id
left join pr on pr.user_id = "user".user_id and pr.event_id = "event".event_id
WHERE user_group.group_id = ${group_id};
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

export const setAttendance = async ({
  user_id,
  event_id,
}: {
  user_id: number;
  event_id: number;
}) => {
  try {
    console.log(user_id, event_id);
    const user_event_check: AttendanceType[] = await sql`
    select attended
    from attendance
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    if (user_event_check == null) {
      throw new Error("User not found in event");
    }
    console.log("here");
    console.log(user_event_check[0].attended);
    let desired_attended_value = user_event_check[0].attended == 1 ? 0 : 1;

    const setAttended: AttendanceType[] = await sql`
    update attendance
    set attended = ${desired_attended_value}
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    revalidatePath("/dashboard/admin/attendance");
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
