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
    // Fetch group_id and pr_deduction from the group table based on event_id
    const groupDetails = await sql`
      SELECT g.group_id, g.pr_deduction
      FROM "group" g
      JOIN "event" e ON g.group_id = e.group_id
      WHERE e.event_id = ${event_id}
    `;

    if (!groupDetails || groupDetails.length === 0) {
      throw new Error("Group not found for the event.");
    }

    const { pr_deduction } = groupDetails[0];

    // Check if there is an existing PR submission for this user and event
    let user_event_check: { submitted: boolean }[] = await sql`
      SELECT submitted
      FROM pr
      WHERE event_id = ${event_id} AND user_id = ${user_id}
    `;

    let desired_submitted_value = undefined;
    let amount_change = 0;

    if (user_event_check.length == 0) {
      // No PR record exists, insert a new one with submitted = true, but no deduction change
      await sql`
        INSERT INTO pr (user_id, event_id, submitted)
        VALUES (${user_id}, ${event_id}, true)
      `;
      desired_submitted_value = true;  // Set PR as submitted, no deduction change
    } else if (user_event_check[0].submitted) {
      // If PR exists and is currently submitted (true), change to false and subtract deduction
      desired_submitted_value = false;
      amount_change = -pr_deduction;  // Subtract deduction
    } else {
      // If PR exists and is not submitted (false), change to true and add deduction
      desired_submitted_value = true;
      amount_change = pr_deduction;  // Add deduction
    }

    // Update the PR submission status
    await sql`
      UPDATE pr
      SET submitted = ${desired_submitted_value}
      WHERE event_id = ${event_id} AND user_id = ${user_id}
    `;

    // Only update curr_amount if there is a deduction change (i.e., PR existed)
    if (user_event_check.length > 0) {
      await sql`
        UPDATE user_group
        SET curr_amount = curr_amount + ${amount_change}
        WHERE user_id = ${user_id} AND group_id = ${groupDetails[0].group_id}
      `;
    }

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
    // Fetch the group_id and attendance deduction from the group table
    const groupDetails = await sql`
      SELECT g.group_id, g.attendance_deduction
      FROM "group" g
      JOIN "event" e ON g.group_id = e.group_id
      WHERE e.event_id = ${event_id}
    `;

    if (!groupDetails || groupDetails.length === 0) {
      throw new Error("Group not found for the event.");
    }

    const { attendance_deduction } = groupDetails[0];

    // Check the current attendance status of the user for the event
    const user_event_check: AttendanceType[] = await sql`
      SELECT attended
      FROM attendance
      WHERE event_id = ${event_id} AND user_id = ${user_id}
    `;

    let old_attended_status = user_event_check.length > 0 ? user_event_check[0].attended : null;

    // Determine the impact on curr_amount based on the new attendance status
    let amount_change = 0;

    if (attendance_status === 1) { // Attended
      amount_change = attendance_deduction;
    } else if (attendance_status === 2) { // Late
      amount_change = -(attendance_deduction / 2);
    } else if (attendance_status === 0) { // Absent
      amount_change = -attendance_deduction;
    }

    // Update curr_amount in user_group even if the user does not exist in attendance
    await sql`
      UPDATE user_group
      SET curr_amount = curr_amount + ${amount_change}
      WHERE user_id = ${user_id}
        AND group_id = ${groupDetails[0].group_id}
    `;

    // Insert or update the attendance status
    if (user_event_check.length == 0) {
      await sql`
        INSERT INTO attendance (attended, date, user_id, event_id)
        VALUES (${attendance_status}, NOW(), ${user_id}, ${event_id})
      `;
    } else {
      await sql`
        UPDATE attendance
        SET attended = ${attendance_status}
        WHERE event_id = ${event_id} AND user_id = ${user_id}
      `;
    }

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
