"use server";
import {
  SubmissionCardProps,
  SubmissionType,
  SubmissionUserNameType,
} from "@/types/submission";
import { sql } from "@/utils/db";

export const retrieveSubmissionsByEventID = async (eventID: number) => {
  try {
    const response: SubmissionUserNameType[] = await sql`SELECT 
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

export const retrieveSubmissionsByUserEmailEventId = async (
  userEmail: string | undefined | null,
  eventID: number
) => {
  try {
    if (userEmail) {
      const response: SubmissionType[] = await sql`SELECT s.* 
      FROM submission s 
      JOIN "user" u ON u.email=${userEmail}
      WHERE u.user_id=s.user_id AND event_id=${eventID}`;

      if (response) {
        return response;
      }
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
    const user_email = formData.user_email;
    if (!user_email) throw new Error(`User email is not entered`);

    await sql`
      INSERT INTO submission (title, date, content, event_id, user_id)
      VALUES (${title}, NOW(), ${content}, ${event_id}, (SELECT user_id FROM "user" WHERE email = ${user_email}))
    `;
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
    const user_email = formData.user_email;
    if (!user_email) throw new Error(`User email is not entered`);

    await sql`
      UPDATE submission
      SET title=${title}, date=NOW(), content=${content}
      WHERE event_id=${event_id} AND user_id=(SELECT user_id FROM "user" WHERE email = ${user_email})
    `;
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
    console.log("Fetched events:", events);

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

      // Deduct curr_amount for users in the specific group who haven't submitted their assignments for the event
      await sql`
        UPDATE user_group
        SET curr_amount = curr_amount - ${assignment_deduction}
        WHERE group_id = ${group_id}  -- Make sure we update only the user's balance for this group
        AND user_id IN (
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

      console.log(
        `curr_amount adjusted by -${assignment_deduction} for users in event_id: ${event_id}`
      );
    }

    return "curr_amount adjustments completed for all unprocessed events.";
  } catch (error) {
    console.error("Error adjusting curr_amount for all users:", error);
    throw error;
  }
};

export const deleteAllSubmissionsInEvent = async (eventId: number) => {
  try {
    await sql`
    DELETE FROM "submission" WHERE event_id = ${eventId}
    `;
    return "Submissions deleted successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to delete submission.";
  }
};
