"use server";
import { SubmissionCardProps, SubmissionType } from "@/types/submission";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const retrieveSubmissionsByEventID = async (eventID: number) => {
  try {
    const response: SubmissionType[] =
      await sql`SELECT * FROM submission WHERE event_id=${eventID}`;
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
