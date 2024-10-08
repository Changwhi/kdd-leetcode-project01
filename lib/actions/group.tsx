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
        SELECT group_id, name, description FROM "group" WHERE NOT private;`;
    return response ? response : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getGroup = async ({ group_id }: { group_id: number }) => {
  try {
    const response: MyGroup[] = await sql`
        SELECT group_id, name, description FROM "group" WHERE group_id = ${group_id};`;
    if (response) {
      return response[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
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
      AND NOT "group".private
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
  const pr_deduction = formData.get("prDeduction");
  const private_group = formData.get("private") === "true"; // Convert to boolean

  try {
    const response = await sql`
    INSERT INTO "group" (name, description, max_participants, attendance_deduction, assignment_deduction, total_deposit, init_deduction, pr_deduction, private)
    VALUES (${name as string}, ${description as string}, ${
      max_participants as string
    }, ${attendance_deduction as string}, ${assignment_deduction as string}, ${
      total_deposit as string
    }, ${initial_deduction as string}, ${pr_deduction as string}, ${private_group})
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
    // Retrieve total_deposit and init_deduction from the group table
    const groupData = await sql`
      SELECT total_deposit, init_deduction
      FROM "group"
      WHERE group_id = ${group_id}
    `;

    if (groupData.length === 0) {
      return "Group not found.";
    }

    const { total_deposit, init_deduction } = groupData[0];

    // Calculate init_amount and curr_amount
    const init_amount = total_deposit;
    const curr_amount = total_deposit - init_deduction;

    // Insert user into user_group with the calculated init_amount and curr_amount
    const response = await sql`
      INSERT INTO user_group (user_id, group_id, user_type, init_amount, curr_amount)
      VALUES (
        (SELECT user_id FROM "user" WHERE email = ${email}),
        ${group_id},
        1, 
        ${init_amount},
        ${curr_amount}
      )
      RETURNING group_id
    `;

    if (response.length > 0) {
      revalidatePath("/group");
      return "Joined group successfully.";
    }
    return "Failed to join group.";
  } catch (error) {
    console.error("Error joining group:", error);
    return "Failed to join group.";
  }
};

