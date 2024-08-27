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
}: {
  event_id: number;
}) => {
  try {
    const response: AttendanceType[] = await sql`
SELECT user_group_id, user_type, init_amount, curr_amount, user_group.user_id, "user".name, "user".email, attendance.attended,  submission_id, pr.submitted
FROM user_group
LEFT JOIN "user" ON "user".user_id = user_group.user_id
left join attendance on "user".user_id = attendance.user_id and attendance.event_id = ${event_id}
left join "event" on "event".event_id = attendance.event_id
left join submission on submission.user_id = "user".user_id and submission.event_id = "event".event_id
left join pr on pr.user_id = "user".user_id and pr.event_id = "event".event_id
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

/**
 * Creates attendance for a specific user and event.
 *
 * @param {number} user_id - The ID of the user
 * @param {number} event_id - The ID of the event
 * @returns a success message or an error message
 */
export const createAttendance = async (
  user_id: number,
  event_id: number
): Promise<string> => {
  try {
    await sql`
    INSERT INTO attendance (attended, date, user_id, event_id)
    VALUES (1, NOW(),${user_id}, ${event_id})
    `;
    revalidatePath("/dashboard/user/eventsPage");
    return "Attendance created successfully.";
  } catch (error) {
    console.error("Error creating attendance:", error);
    return "Failed to create attendance.";
  }
};

/**
 * Deletes attendance for a specific user and event.
 *
 * @param {number} user_id - The ID of the user
 * @param {number} event_id - The ID of the event
 * @returns a success message or an error message
 */
export const deleteAttendance = async (
  user_id: number,
  event_id: number
): Promise<string> => {
  try {
    await sql`
    DELETE FROM attendance
    WHERE user_id=${user_id} AND event_id=${event_id}
    `;
    revalidatePath("/dashboard/user/eventsPage");
    return "Attendance deleted successfully.";
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return "Failed to delete attendance.";
  }
};
