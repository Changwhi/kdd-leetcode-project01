"use server";
import { sql } from "@/utils/db";
import { EventCardPropsForDB, EventType } from "@/types/event";
import { revalidatePath } from "next/cache";
/**
 * Retrieves a list of events from the database.
 *
 * @return {EventType[]} An array of events if the query is successful, otherwise an empty array.
 */
export const retrieveEvents = async (group_id: number) => {
  try {
    console.log(group_id);
    const response: EventType[] =
      await sql`SELECT * FROM event where group_id = ${group_id} ORDER BY date DESC`;
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
export const addEvent = async ({
  name,
  date,
  topic,
  zoomlink,
  group_id,
  assign1,
  assign2,
  assign3,
}: {
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  assign1: string;
  assign2: string;
  assign3: string;
}) => {
  try {
    console.log(
      group_id,
      name,
      date,
      topic,
      zoomlink,
      assign1,
      assign2,
      assign3
    );

    await sql`
      INSERT INTO event (name, date, topic, zoomlink, group_id, assign1, assign2, assign3)
      VALUES (${name}, ${date}, ${topic}, ${zoomlink}, ${group_id}, ${assign1}, ${assign2}, ${assign3})
    `;
    revalidatePath(`/dashboard/admin/${group_id}/events`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates an existing event in the database.
 *
 * @param {EventCardProps} formData - The new data for the event.
 * @return {Promise<void>} A promise that resolves when the event is successfully updated, or rejects with an error if there is an issue.
 */
export const updateEvent = async (formData: EventCardPropsForDB) => {
  try {
    if (!formData) {
      return [];
    }
    const name = formData.name;
    const date = formData.date;
    const topic = formData.topic;
    const zoomlink = formData.zoomlink;
    const group_id = formData.group_id;
    const assign1 = formData.assign1;
    const assign2 = formData.assign2;
    const assign3 = formData.assign3;
    const event_id = formData.event_id;
    await sql`
      UPDATE event
      SET name = ${name}, date = ${date}, topic = ${topic}, zoomlink = ${zoomlink}, group_id = ${group_id}, assign1 = ${assign1}, assign2 = ${assign2}, assign3 = ${assign3}
      WHERE event_id = ${event_id}
    `;
    revalidatePath("/dashboard/admin/events");
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (event_id: number) => {
  try {
    await sql`
      DELETE FROM event
      WHERE event_id = ${event_id}
    `;
    revalidatePath("/dashboard/admin/events");
  } catch (error) {
    console.log(error);
  }
};
