"use server";
import { sql } from "@/utils/db";
import { EventAttendacePrType, EventIdType } from "@/types/event";

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
 * Retrieve upcoming events data along with the given group_id in database
 *
 * @param groupId - a group_id as an int
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrieveUpcomingEventsIdByGroup = async (
  groupId: number
): Promise<number[]> => {
  try {
    const response: EventIdType[] = await sql`SELECT event_id 
    FROM event 
    WHERE group_id = ${groupId} AND date >= NOW()`;
    const eventIds: number[] = response.map((event: { event_id: number }) => event.event_id);
    return eventIds;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * Retrieve past events data along with the given group_id in database
 *
 * @param groupId - a group_id as an int
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrievePastEventsIdByGroup = async (
  groupId: number
): Promise<number[]> => {
  try {
    const response: EventIdType[] = await sql`SELECT event_id 
    FROM event 
    WHERE group_id = ${groupId} AND date < NOW()`;
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
    json_agg(a) AS assignments,
    BOOL_OR(s.event_id IS NOT NULL) AS assignment_submitted,
    CASE
        WHEN MAX(at.event_id) IS NULL THEN 0
        ELSE MAX(at.attended)
    END AS attendance_attended,
    BOOL_OR(PR.submitted = TRUE) AS pr_submitted      
    FROM event e
    LEFT JOIN Submission s ON s.user_id= ${userID} AND e.event_id = s.event_id
    LEFT JOIN Attendance at ON at.user_id = ${userID} AND e.event_id = at.event_id
    LEFT JOIN PR ON PR.user_id = ${userID} AND e.event_id = PR.event_id
    LEFT JOIN assignment a ON e.event_id = a.event_id
    WHERE e.event_id IN ${sql(eventIds)}
    GROUP BY e.event_id
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

/**
 * Retrieve all events data along with the given group_id in database
 *
 * @param eventIds - a event id as an int
 * @param userEmail -a user email as a string
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrieveEventsbyEventAndUserEmail = async (
  eventIds: number[],
  userEmail: string
): Promise<EventAttendacePrType[]> => {
  try {
    const response: EventAttendacePrType[] = await sql`SELECT
    e.event_id,
    e.name,
    e.date,
    e.topic,
    e.zoomlink,
    json_agg(a) AS assignments,
    BOOL_OR(s.event_id IS NOT NULL) AS assignment_submitted,
    CASE
        WHEN MAX(at.event_id) IS NULL THEN 0
        ELSE MAX(at.attended)
    END AS attendance_attended,
    BOOL_OR(PR.submitted = TRUE) AS pr_submitted
    FROM event e
    LEFT JOIN "user" u ON u.email = ${userEmail}
    LEFT JOIN Submission s ON s.user_id= u.user_id AND e.event_id = s.event_id
    LEFT JOIN Attendance at ON at.user_id = u.user_id AND e.event_id = at.event_id
    LEFT JOIN PR ON PR.user_id = u.user_id AND e.event_id = PR.event_id
    LEFT JOIN assignment a ON e.event_id = a.event_id
    WHERE e.event_id IN ${sql(eventIds)}
    GROUP BY e.event_id
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
