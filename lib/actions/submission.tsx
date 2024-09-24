"use server";
import { SubmissionCardProps, SubmissionType, SubmissionUserNameType } from "@/types/submission";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const retrieveSubmissionsByEventID = async (eventID: number) => {
  try {
    const response: SubmissionUserNameType[] =
      await sql`SELECT 
      s.*,
      u.name AS user_name
      FROM submission s
      JOIN "user" u ON u.user_id=s.user_id
      WHERE event_id=${eventID}`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const retrieveSubmissionsByUserIdEventId = async (userID: number, eventID: number) => {
  try {
    const response: SubmissionType[] =
      await sql`SELECT * FROM submission WHERE user_id=${userID} AND event_id=${eventID}`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createSubmission = async (formData: SubmissionCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData);
    const title = formData.title;
    const content = formData.content;
    const event_id = formData.event_id;
    const user_id = formData.user_id;

    await sql`
      INSERT INTO submission (title, date, content, event_id, user_id)
      VALUES (${title}, NOW(), ${content}, ${event_id}, ${user_id})
    `;
    revalidatePath("/dashboard/user/eventsPage");
  } catch (error) {
    console.log(error);
  }
};

export const updateSubmission = async (formData: SubmissionCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData);
    const title = formData.title;
    const content = formData.content;
    const event_id = formData.event_id;
    const user_id = formData.user_id;

    await sql`
      UPDATE submission
      SET title=${title}, date=NOW() content=${content}
      WHERE user_id=${user_id} AND event_id=${event_id}
    `;
    revalidatePath("/dashboard/user/eventsPage");
  } catch (error) {
    console.log(error);
  }
};

export const adjustCurrAmountForAllUsers = async () => {
  try {
    // Get all events that have passed and haven't been processed yet
    const events = await sql`
      SELECT event_id, group_id, date
      FROM event
      WHERE date < NOW() AND processed = FALSE  -- Only get unprocessed events
    `;

    if (!events || events.length === 0) {
      return "No unprocessed events to check.";
    }

    // Iterate through each unprocessed event
    for (const event of events) {
      const { event_id, group_id } = event;

      // Get the assignment deduction from the group for the event
      const group = await sql`
        SELECT assignment_deduction
        FROM "group"
        WHERE group_id = ${group_id}
      `;

      if (!group || group.length === 0) {
        console.log(`Group not found for event_id: ${event_id}`);
        continue;
      }

      const assignment_deduction = group[0].assignment_deduction;

      // Deduct curr_amount for all users who haven't submitted their assignments for the event
      await sql`
        UPDATE user_group
        SET curr_amount = curr_amount - ${assignment_deduction}
        WHERE user_id IN (
          SELECT u.user_id
          FROM user_group u
          LEFT JOIN submission s ON u.user_id = s.user_id AND s.event_id = ${event_id}
          WHERE u.group_id = ${group_id} AND s.submission_id IS NULL
        )
      `;

      // Mark the event as processed
      await sql`
        UPDATE event
        SET processed = TRUE
        WHERE event_id = ${event_id}
      `;

      console.log(`curr_amount adjusted by -${assignment_deduction} for users in event_id: ${event_id}`);
    }

    return "curr_amount adjustments completed for all unprocessed events.";
  } catch (error) {
    console.error('Error adjusting curr_amount for all users:', error);
    throw error;
  }
};
