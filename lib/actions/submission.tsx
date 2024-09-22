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
