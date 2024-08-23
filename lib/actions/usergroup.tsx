"use server";
import { sql } from "@/utils/db";
import { UserGroupProps, UserGroupType } from "@/types/group";
import { ResponseType } from "@/types/response";

/**
 * Returns all users in a given group
 *
 * @param group_id - Group ID as a number
 * @returns An array of users if users exist, otherwise empty array
 */
export const retrieveAllUsersByGroup = async (group_id: number) => {
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
 * Returns a given user's type in a given group
 *
 * @param user_id - A user ID as a number
 * @param group_id - A group ID as a number
 * @returns A user object if user exists, otherwise null
 */
export const retrieveUserType = async (user_id: number, group_id: number) => {
  try {
    const response: UserGroupType[] =
      await sql`SELECT user_type FROM user_group WHERE group_id=${group_id} AND user_id=${user_id}`;
    if (response.length > 0) {
      return response[0];
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};

/**
 * Create new user_group column when user joins a new group
 *
 * @param formData - A user_group data as a UserGroupProps object
 * @returns A response object
 */
export const createUserGroup = async (formData: UserGroupProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData);
    const user_type = formData.user_type;
    const init_amount = formData.init_amount;
    const curr_amount = formData.curr_amount;
    const group_id = formData.group_id;
    const user_id = formData.user_id;

    const response: ResponseType[] = await sql`
      INSERT INTO user_group (user_type, init_amount, curr_amount, group_id, user_id)
      VALUES (${user_type}, ${init_amount}, ${curr_amount}, ${group_id}, ${user_id})
    `;
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete user_group row in database
 *
 * @param user_id - A user ID as a number
 * @param group_id - A group ID as a number
 * @returns A response object
 */
export const deleteUserGroup = async (user_id: number, group_id: number) => {
  try {
    const response: ResponseType[] = await sql`
    DELETE FROM "user" WHERE user_id = ${user_id} AND group_id = ${group_id}
    `;
    return response;
  } catch (error) {
    console.log(error);
  }
};
