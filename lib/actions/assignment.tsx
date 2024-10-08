import { AssignmentType, AssignmentProps } from "@/types/assignment";
import { sql } from "@/utils/db";
import { getSession } from "@auth0/nextjs-auth0";

export const retrieveassignmentsByEventID = async (eventID: number) => {
  try {
    const response: AssignmentType[] =
      await sql`SELECT * FROM assignment WHERE event_id=${eventID}`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createAssignment = async (
  content: string,
  event_id: number,
) => {
  try {
    const session = await getSession();
    if (!session) throw new Error("User is not logged in");

    await sql`
      INSERT INTO assignment (content, event_id, user_id)
      VALUES (${content}, ${event_id}, (SELECT user_id FROM "user" WHERE email = ${session.user.email}))
    `;
  } catch (error) {
    console.log(error);
  }
};

export const updateAssignment = async (
  assignmentId: number,
  content: string
) => {
  try {
    await sql`
      UPDATE assignment
      SET content=${content}
      WHERE assignment_id = ${assignmentId}
    `;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAssignment = async (assignmentId: number) => {
  try {
    await sql`
    DELETE FROM "assignment" WHERE assignment_id = ${assignmentId}
    `;
    console.log("Assignment deleted successfully.");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteMultipleAssignment = async (assignmentIds: number[]) => {
  try {
    if (!assignmentIds || assignmentIds.length === 0) {
      return "No event IDs provided.";
    }
    await sql`
      DELETE FROM "assignment"
      WHERE assignment_id = ANY(${assignmentIds})
    `;
    console.log("Assignments deleted successfully." + assignmentIds);
    return true;
  } catch (error) {
    console.error("Error deleting assignments:", error);
    return false;
  }
};

export const deleteAllAssignmentsInEvent = async (eventId: number) => {
  try {
    await sql`
    DELETE FROM "assignment" WHERE event_id = ${eventId}
    `;
    return "Assignments deleted successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to delete assignments.";
  }
};
