"use server";
import { sql } from "@/utils/db";
import { EventCardPropsForDB, EventType } from "@/types/event";
import { revalidatePath } from "next/cache";
import {
  createAssignment,
  deleteAllAssignmentsInEvent,
  updateAssignment,
  deleteMultipleAssignment,
} from "./assignment";
import { deleteAllSubmissionsInEvent } from "./submission";
import { deleteAllAttendanceInEvent, deleteAllPRsInEvent } from "./attendance";

/**
 * Retrieves a list of events from the database.
 *
 * @return {EventType[]} An array of events if the query is successful, otherwise an empty array.
 */
export const retrieveEvents = async (group_id: number) => {
  try {
    const events: EventType[] = await sql`
      SELECT 
        e.event_id, 
        e.name, 
        e.date,
        e.zoomLink,
        e.topic,
        e.group_id,
        e.processed,
        json_agg(a) AS assignments
      FROM event e
      LEFT JOIN 
        assignment a ON e.event_id = a.event_id
      WHERE group_id = ${group_id}
      GROUP BY 
        e.event_id
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
  try {
    const response = await sql`
      INSERT INTO event (name, date, topic, zoomlink, group_id)
      VALUES (${name}, ${date}, ${topic}, ${zoomlink}, ${group_id})
      RETURNING event_id;
    `;
    const eventId = response[0].event_id;
    const NumAssignments = assign.length;
    for (let i = 0; i < NumAssignments; i++) {
      if (assign[i]) {
        await createAssignment(assign[i], eventId);
      }
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
      assignments,
      event_id,
      deleteAssignmentIds,
      newAssignments,
    } = formData;
    console.log(formData);
    // Now `date` contains both date and time
    await sql`
      UPDATE event
      SET name = ${name}, date = ${date}, topic = ${topic}, zoomlink = ${zoomlink}, group_id = ${group_id}
      WHERE event_id = ${event_id}
    `;

    for (let i = 0; i < assignments.length; i++) {
      if (assignments[i]) {
        await updateAssignment(assignments[i].id, assignments[i].content);
      }
    }
    await deleteMultipleAssignment(deleteAssignmentIds);

    for (let i = 0; i < newAssignments.length; i++) {
      if (newAssignments[i]) {
        await createAssignment(newAssignments[i], event_id);
      }
    }

        revalidatePath(`/dashboard/${group_id}/events`);

  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (event_id: number) => {
  try {
    await deleteAllAssignmentsInEvent(event_id);
    await deleteAllSubmissionsInEvent(event_id);
    await deleteAllAttendanceInEvent(event_id);
    await deleteAllPRsInEvent(event_id);
    await sql`
      DELETE FROM event
      WHERE event_id = ${event_id}
    `;
    revalidatePath("/dashboard/events");
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllEventsInGroup = async (group_id: number) => {
  try {
    const eventIds = await sql`
      SELECT event_id FROM event WHERE group_id = ${group_id}
    `;

    for (const event of eventIds) {
      await deleteEvent(event.event_id);
    }

  } catch (error) {
    console.error("Error deleting events:", error);
  }
};
