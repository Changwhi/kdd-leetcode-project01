import { AssignmentType, AssignmentProps } from "@/types/assignment";
import { sql } from "@/utils/db";

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

export const createAssignment = async (formData: AssignmentProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData);
    const content = formData.content;
    const event_id = formData.event_id;
    const number = formData.number;
    const user_email = formData.user_email;
    if (!user_email) throw new Error(`User email is not entered`);

    await sql`
      INSERT INTO assignment (content, number, event_id, user_id)
      VALUES (${content}, ${number}, ${event_id}, (SELECT user_id FROM "user" WHERE email = ${user_email}))
    `;
  } catch (error) {
    console.log(error);
  }
};

export const updateAssignment = async (formData: AssignmentProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData);
    const assignmentId = formData.assignment_id;
    const content = formData.content;
    if (!assignmentId) throw new Error("Submission id is not entered");
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
    return "Assignment deleted successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to delete assignment.";
  }
};
