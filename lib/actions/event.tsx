"use server";
import { sql } from "@/utils/db";
import { EventCardProps, EventType } from "@/types/event";
import { revalidatePath } from "next/cache";
/**
 * Retrieves a list of events from the database.
 *
 * @return {EventType[]} An array of events if the query is successful, otherwise an empty array.
 */
export const retrieveEvents = async () => {
  try {
    const response: EventType[] = await sql`SELECT * FROM event`;
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
 * Adds a new event to the database.
 *
 * @param {EventCardProps} formData - The data for the new event.
 * @return {Promise<void>} A promise that resolves when the event is successfully added, or rejects with an error if there is an issue.
 */
export const addEvent = async (formData: EventCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData.name);
    const name = formData.name;
    const date = formData.date;
    const topic = formData.topic;
    const zoomlink = formData.zoomlink;
    const group_id = formData.group_id;

    await sql`
      INSERT INTO event (name, date, topic, zoomlink, group_id)
      VALUES (${name}, ${date}, ${topic}, ${zoomlink}, ${group_id})
    `;
    revalidatePath("/dashboard/admin/events");
  } catch (error) {
    console.log(error);
  }
};
