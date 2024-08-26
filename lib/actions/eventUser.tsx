"use server";
import { sql } from "@/utils/db";
import { EventAttendacePrType, EventIdType } from "@/types/event";
import { revalidatePath } from "next/cache";

/**
 * Retrieve all events data along with the given group_id in database
 *
 * @param groupId - a group_id as an int
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrieveAllEventsIdByGroup = async (
  groupId: number
): Promise<number[]> => {
  try {
    const response: EventIdType[] = await sql`SELECT event_id 
    FROM event 
    WHERE group_id = ${groupId}`;
    const eventIds: number[] = response.map((event: { event_id: number }) => event.event_id);
    return eventIds;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * Retrieve all events data along with the given group_id in database
 *
 * @param eventIds - a event id as an int
 * @param userID -a user id as an int
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrieveEventsbyEventAndUser = async (
  eventIds: number[],
  userID: number
): Promise<EventAttendacePrType[]> => {
  try {
    const response: EventAttendacePrType[] = await sql`SELECT
    e.event_id,
    e.name,
    e.date,
    e.topic,
    e.zoomlink,
    CASE
        WHEN s.event_id IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS assignment_submitted,
    CASE
        WHEN at.attended=1 THEN TRUE
        ELSE FALSE
    END AS attendance_attended,
    CASE
        WHEN PR.submitted = TRUE THEN TRUE
        ELSE FALSE
    END AS pr_submitted
    FROM event e
    LEFT JOIN
        Submission s ON s.user_id= ${userID} AND e.event_id = s.event_id
    LEFT JOIN
        Attendance at ON at.user_id = ${userID} AND e.event_id = at.event_id
    LEFT JOIN
        PR ON PR.user_id = ${userID} AND e.event_id = PR.event_id
    WHERE
        e.event_id IN ${sql(eventIds)}
    ORDER BY date DESC`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};