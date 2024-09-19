"use server";
import { MyGroup, otherGroup } from "@/types/group";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";

/**
 * Retrieve all existing groups
 *
 * @returns An array of MyGroup if exist, otherwise an empty array
 */
export const getAllGroups = async () => {
  try {
    const response: MyGroup[] = await sql`
        SELECT group_id, name, description FROM "group";`;
    return response ? response : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * Retrieve all groups that the user with the given email is a member of
 *
 * @param email - The user's email as a string
 * @returns An array of MyGroup if exist, otherwise an empty array
 */
export const getMyGroups = async ({ email }: { email: string }) => {
  try {
    if (!email) {
      return [];
    }
    const response: MyGroup[] = await sql`
        SELECT user_type, "group".group_id, user_group.user_id, "group".name, "group".description, "user".email
        FROM user_group
        join "group" on user_group.group_id = "group".group_id
		join "user" on "user".user_id = user_group.user_id
		where "user".email = ${email};
        `;
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
 * Returns all groups that the user is not in
 *
 * @param email - The user's email as a string
 * @returns An array of otherGroup if exist, otherwise an empty array
 */
export const getOtherGroups = async ({ email }: { email: string }) => {
  try {
    if (!email) {
      return [];
    }
    const response: otherGroup[] = await sql`
       SELECT 
      "group".group_id,
      "group".name,
      "group".description,
      ARRAY_AGG(user_group.user_id) AS user_ids,
      ARRAY_AGG("user".email) AS emails,
      ARRAY_AGG(user_group.user_type) AS user_types
  FROM 
      user_group
  JOIN 
      "group" ON user_group.group_id = "group".group_id
  JOIN 
      "user" ON "user".user_id = user_group.user_id
  WHERE 
      "group".group_id NOT IN (
          SELECT group_id 
          FROM user_group
          JOIN "user" ON user_group.user_id = "user".user_id
          WHERE "user".email = ${email}
      )
  GROUP BY 
      "group".group_id, 
      "group".name, 
      "group".description;
`;
    return response || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieve all members in a group
 *
 * @param group_id - Group ID as a number
 * @returns An array of { user_type, group_id, user_id, name, description } if exist, otherwise an empty array
 */
export const getAllMemberInGroup = async ({
  group_id,
}: {
  group_id: number;
}) => {
  try {
    const response = await sql`
        SELECT user_type, "group".group_id, user_id, "group".name, "group".description 
        FROM user_group
        join "group" on user_group.group_id = "group".group_id
        WHERE "group".group_id = ${group_id}
        `;
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
 * Create a new group with the given form data and the user's email
 *
 * @param formData - A FormData object with the group data
 * @param email - The user's email as a string
 * @returns A boolean indicating whether the group was created successfully
 */
export const createGroup = async ({
  formData,
  email,
}: {
  formData: FormData;
  email: string;
}) => {
  const name = formData.get("title");
  const description = formData.get("description");
  const max_participants = formData.get("maxParticipants");
  const attendance_deduction = formData.get("attendanceDeduction");
  const assignment_deduction = formData.get("assignmentDeduction");
  const total_deposit = formData.get("totalDeposit");
  const initial_deduction = formData.get("initialDeduction");

  try {
    const response = await sql`
    INSERT INTO "group" (name, description, max_participants, attendance_deduction, assignment_deduction, total_deposit,init_deduction)
    VALUES (${name as string}, ${description as string}, ${
      max_participants as string
    }, ${attendance_deduction as string}, ${assignment_deduction as string}, ${
      total_deposit as string
    }, ${initial_deduction as string})
    RETURNING group_id
    `;
    const newGroupId = response[0]?.group_id;

    if (newGroupId) {
      console.log("New group ID:", newGroupId);
      const user = await sql`
        SELECT user_id FROM "user" WHERE email = ${email}
        `;

      if (user) {
        await sql`
          INSERT INTO user_group (user_id, group_id, user_type, init_amount, curr_amount)
          VALUES (${user[0].user_id}, ${newGroupId}, 0, 0, 0)
          `;
      }
    }
    revalidatePath("/group");
    return true;
  } catch (error) {
    console.error("Error creating group:", error);
    return false;
  }
};

/**
 * Join an existing group with the given group_id and user email
 *
 * @param group_id - The group_id of the group to join
 * @param email - The user's email as a string
 * @returns A string indicating success or failure of the join operation
 */
export const joinGroup = async ({
  group_id,
  email,
}: {
  group_id: number;
  email: string;
}) => {
  try {
    const response = await sql`
    INSERT INTO user_group (user_id, group_id, user_type, init_amount, curr_amount)
    VALUES ((SELECT user_id FROM "user" WHERE email = ${email}), ${group_id}, 1, 30, 30)
    RETURNING group_id
    `;

    if (response) {
      revalidatePath("/group");
      return "Joined group successfully.";
    }
    return "Failed to join group.";
  } catch (error) {
    console.error("Error joining group:", error);
    return "Failed to join group.";
  }
};
