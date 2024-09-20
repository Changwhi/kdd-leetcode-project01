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
  group_id,
}: {
  event_id: number | undefined;
  group_id: number | undefined;
}) => {
  try {
    if (!event_id || !group_id) {
      return [];
    }
    const response: AttendanceType[] = await sql`
SELECT user_group_id, user_type, init_amount, curr_amount, user_group.user_id, "user".name, "user".email, attendance.attended, "user".user_id, pr.event_id as "pr_event", "event".event_id, submission_id, pr.submitted
FROM user_group
LEFT JOIN "user" ON "user".user_id = user_group.user_id
left join attendance on "user".user_id = attendance.user_id and attendance.event_id = ${event_id}
left join "event" on "event".event_id = attendance.event_id
left join submission on submission.user_id = "user".user_id and submission.event_id = "event".event_id
left join pr on pr.user_id = "user".user_id and pr.event_id = ${event_id}
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

/**
 * Creates attendance for a specific user and event when user does self-checkin.
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
 * Creates attendance for a specific user and event when user does self-checkin.
 *
 * @param {string} user_email - The email of the user
 * @param {number} event_id - The ID of the event
 * @returns a success message or an error message
 */
export const createAttendanceWithUserEmail = async (
  user_email: string,
  event_id: number
): Promise<string> => {
  try {
    await sql`
    INSERT INTO attendance (attended, date, user_id, event_id)
    VALUES (1, NOW(), (SELECT user_id FROM "user" WHERE email = ${user_email}), ${event_id})
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

/**
 * Deletes attendance for a specific user and event.
 *
 * @param {string} user_email - The ID of the user
 * @param {number} event_id - The ID of the event
 * @returns a success message or an error message
 */
export const deleteAttendanceWithUserEmail = async (
  user_email: string,
  event_id: number
): Promise<string> => {
  try {
    await sql`
    DELETE FROM attendance
    WHERE user_id=(SELECT user_id FROM "user" WHERE email = ${user_email}) AND event_id=${event_id}
    `;
    revalidatePath("/dashboard/user/eventsPage");
    return "Attendance deleted successfully.";
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return "Failed to delete attendance.";
  }
};

/**
 * Sets the attendance status for a user in a specific event.
 *
 * @param {number} user_id - The ID of the user to set the attendance status for.
 * @param {number} event_id - The ID of the event to set the attendance status for.
 * @return {boolean} True if the attendance status was set successfully, false otherwise.
 */
export const setAttendance = async ({
  user_id,
  event_id,
}: {
  user_id: number;
  event_id: number;
}) => {
  try {
    const user_event_check: AttendanceType[] = await sql`
    select attended
    from attendance
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    if (user_event_check == null) {
      throw new Error("User not found in event");
    }
    let desired_attended_value = user_event_check[0].attended == 1 ? 0 : 1;

    await sql`
    update attendance
    set attended = ${desired_attended_value}
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

/**
 * Sets the PR status for a user in a specific event.
 *
 * @param {number} user_id - The ID of the user to set the PR status for.
 * @param {number} event_id - The ID of the event to set the PR status for.
 * @return {boolean} True if the PR status was set successfully, false otherwise.
 */
export const setPR = async ({
  user_id,
  event_id,
}: {
  user_id: number;
  event_id: number;
}) => {
  try {
    console.log(user_id, event_id);
    let user_event_check: AttendanceType[] = await sql`
    select *
    from pr
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    let desired_submitted_value = undefined;
    if (user_event_check.length == 0) {
      await sql`
      insert into pr (user_id, event_id, submitted)
      values (${user_id}, ${event_id}, false)
      `;
      desired_submitted_value = true;
    } else {
      console.log(user_event_check);
      desired_submitted_value = user_event_check[0].submitted ? false : true;
    }

    await sql`
    update pr
    set submitted = ${desired_submitted_value}
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

/**
 * Force attendance status for a user in a specific event.
 *
 * @param {number} user_id - The ID of the user to set the attendance status for.
 * @param {number} event_id - The ID of the event to set the attendance status for.
 * @param {number} attendance_status - The desired attendance status (0=absent, 1=attended, 2=late).
 * @return {boolean} True if the attendance status was set successfully, false otherwise.
 */
export const forceAttendance = async ({
  user_id,
  event_id,
  attendance_status,
}: {
  user_id: number;
  event_id: number;
  attendance_status: number;
}) => {
  try {
    console.log(user_id, event_id);
    const user_event_check: AttendanceType[] = await sql`
    select attended
    from attendance
    where event_id = ${event_id} and user_id = ${user_id}
    `;
    if (user_event_check.length == 0) {
      await sql`
    INSERT INTO attendance (attended, date, user_id, event_id)
    VALUES (${attendance_status}, NOW(), ${user_id}, ${event_id})
  `;
    } else {
      const response: any = await sql`
      update attendance
      set attended = ${attendance_status}
      where event_id = ${event_id} and user_id = ${user_id}
      `;
    }
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
