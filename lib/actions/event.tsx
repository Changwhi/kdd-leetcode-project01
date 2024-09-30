"use server";
import { sql } from "@/utils/db";
import { EventCardPropsForDB, EventType } from "@/types/event";
import { revalidatePath } from "next/cache";
import { createAssignment } from "./assignment";

/**
 * Retrieves a list of events from the database.
 *
 * @return {EventType[]} An array of events if the query is successful, otherwise an empty array.
 */
export const retrieveEvents = async (group_id: number) => {
  try {
    const events: EventType[] = await sql`
      SELECT 
        event_id, 
        name, 
        date,
        assign1, 
        assign2, 
        assign3,
        zoomLink,
        topic,
        group_id,
        processed
      FROM event
      WHERE group_id = ${group_id}
      ORDER BY date DESC;
    `;
    if (events) {
      return events;
    }
    return [];
  } catch (error) {
    console.error("Failed to retrieve events:", error);
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
  assign,
}: {
  name: string;
  date: string;
  topic: string;
  zoomlink: string;
  group_id: number;
  assign: string[];
}) => {
  //TODO: Delete these assignments
  const assign1 = "";
  const assign2 = "";
  const assign3 = "";
  //TODO: Delete until this
  try {
    const response = await sql`
      INSERT INTO event (name, date, topic, zoomlink, group_id, assign1, assign2, assign3)
      VALUES (${name}, ${date}, ${topic}, ${zoomlink}, ${group_id}, ${assign1}, ${assign2}, ${assign3})
      RETURNING event_id;
    `;
    const eventId = response[0].event_id;
    const NumAssignments = assign.length;
    for (let i = 0; i < NumAssignments; i++) {
      await createAssignment(assign[i], eventId, i);
    }

    if (response) {
      revalidatePath("/dashboard/events");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
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

    const {
      name,
      date,
      topic,
      zoomlink,
      group_id,
      assign1,
      assign2,
      assign3,
      event_id,
    } = formData;

    // Now `date` contains both date and time
    await sql`
      UPDATE event
      SET name = ${name}, date = ${date}, topic = ${topic}, zoomlink = ${zoomlink}, group_id = ${group_id}, assign1 = ${assign1}, assign2 = ${assign2}, assign3 = ${assign3}
      WHERE event_id = ${event_id}
    `;
    revalidatePath("/dashboard/events");
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
    revalidatePath("/dashboard/events");
  } catch (error) {
    console.log(error);
  }
};
