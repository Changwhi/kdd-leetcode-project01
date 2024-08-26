"use server";
import { sql } from "@/utils/db";
import { UserGroupProps, UserGroupType } from "@/types/group";
import { ResponseType } from "@/types/response";

/**
 * Returns all users in a given group
 *
 * @param group_id - Group ID as a number
 * @returns An array of user_group if exist, otherwise an empty array
 */
export const retrieveAllUsersByGroup = async (
  group_id: number
): Promise<UserGroupType[]> => {
  try {
    const response: UserGroupType[] =
      await sql`SELECT * FROM user_group WHERE group_id=${group_id}`;
    if (response.length > 0) {
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  }
};

/**
 * Returns all groups along with a given user
 *
 * @param user_id - user_id as a number
 * @returns An array of user_group if exist, otherwise an empty array
 */
export const retrieveAllGroupsByUsers = async (
  user_id: number
): Promise<UserGroupType[]> => {
  try {
    const response: UserGroupType[] =
      await sql`SELECT * FROM user_group WHERE user_id=${user_id}`;
    if (response.length > 0) {
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  }
};

/**
 * Returns a given user's type in a given group
 *
 * @param user_id - A user ID as a number
 * @param group_id - A group ID as a number
 * @returns An array of user_group if exist, otherwise an empty array
 */
export const retrieveUserGroup = async (
  user_id: number,
  group_id: number
): Promise<UserGroupType[]> => {
  try {
    const response: UserGroupType[] =
      await sql`SELECT user_type FROM user_group WHERE group_id=${group_id} AND user_id=${user_id}`;
    if (response.length > 0) {
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error retrieving user:", error);
    return [];
  }
};

/**
 * Create new user_group column when user joins a new group
 *
 * @param formData - A user_group data as a UserGroupProps object
 * @returns a success message or an error message
 */
export const createUserGroup = async (
  formData: UserGroupProps
): Promise<string> => {
  try {
    if (!formData) {
      return "Data form is not exist";
    }
    console.log(formData);
    const user_type = formData.user_type;
    const init_amount = formData.init_amount;
    const curr_amount = formData.curr_amount;
    const group_id = formData.group_id;
    const user_id = formData.user_id;

    // Prevent make duplicate
    const existingUserGroup = await retrieveUserGroup(user_id, group_id);
    if (existingUserGroup.length > 0) {
      return "User is already in a group.";
    }

    const response: ResponseType[] = await sql`
      INSERT INTO user_group (user_type, init_amount, curr_amount, group_id, user_id)
      VALUES (${user_type}, ${init_amount}, ${curr_amount}, ${group_id}, ${user_id})
    `;
    return "User_group created successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to create user_group.";
  }
};

/**
 * Delete user_group row in database
 *
 * @param user_id - A user ID as a number
 * @param group_id - A group ID as a number
 * @returns a success message or an error message
 */
export const deleteUserGroup = async (
  user_id: number,
  group_id: number
): Promise<string> => {
  try {
    const response: ResponseType[] = await sql`
    DELETE FROM "user" WHERE user_id = ${user_id} AND group_id = ${group_id}
    `;
    return "User_group deleted successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to delete user_group.";
  }
};