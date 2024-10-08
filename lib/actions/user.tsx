"use server";
import { sql } from "@/utils/db";
import { UserType } from "@/types/user";
import { ResponseType } from "@/types/response";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * Retrieve all users data in database
 *
 * @returns An array of users data if users exist, otherwise an empty array
 */
export const retrieveAllUsers = async (): Promise<UserType[]> => {
  try {
    const response: UserType[] = await sql`SELECT * FROM "user"`;
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
 * Retrieve a user from the database by email
 *
 * @param email - User's email as a string
 * @returns An array of user data if user exists, otherwise an empty array
 */
export const retrieveUser = async (email: string): Promise<UserType[]> => {
  try {
    const response: UserType[] =
      await sql`SELECT * FROM "user" WHERE email = ${email}`;
    return response.length > 0 ? response : [];
  } catch (error) {
    console.error("Error retrieving user:", error);
    return [];
  }
};

/**
 * Create a new user in the "user" table in the database
 *
 * @param name - User's name as a string
 * @param email - User's email as a string
 * @returns a success message or an error message
 */
export const createUser = async (
  name: string,
  email: string
): Promise<string> => {
  try {
    // Prevent make duplicate
    const existingUser = await retrieveUser(email);
    if (existingUser.length > 0) {
      return "User already exists.";
    }

    const user_name = name.length <= 20 ? name : name.slice(0, 20);
    await sql`
      INSERT INTO "user" (name, email)
      VALUES (${user_name}, ${email})
    `;

    return "User created successfully.";
  } catch (error) {
    console.error("Error creating user:", error);
    return "Failed to create user.";
  }
};

/**
 * Delete the user in user table in database
 *
 * @param email - User's email as a string
 * @returns a success message or an error message
 */
export const deleteUser = async (email: string): Promise<string> => {
  try {
    const response: ResponseType[] = await sql`
    DELETE FROM "user" WHERE email =  ${email}
    `;
    return "User deleted successfully.";
  } catch (error) {
    console.log(error);
    return "Failed to delete user.";
  }
};

/**
 * Returns the user information of the currently logged in user.
 *
 * @returns The user object if logged in, otherwise null
 */

export const getLoggedInUser = async () => {
  try {
    const session = await getSession();
    const user = session?.user;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setDepositStatus = async ({
  user_id,
  group_id,
  status,
}: {
  user_id: number;
  group_id: number;
  status: "Received" | "Pending" | "Returned";
}) => {
  try {
    console.log(user_id, group_id, status);
    await sql`
      UPDATE user_group
      SET deposit_status = ${status}
      WHERE user_id = ${user_id} AND group_id = ${group_id};
    `;

    let updatedCurrAmount = null;

    if (status === "Received") {
      const result = await sql`
        UPDATE user_group
        SET curr_amount = init_amount - (SELECT init_deduction FROM "group" WHERE group_id = ${group_id})
        WHERE user_id = ${user_id} AND group_id = ${group_id}
        RETURNING curr_amount;
      `;

      updatedCurrAmount = result[0]?.curr_amount;
      console.log("Received - initialized deposit", updatedCurrAmount);
    }

    return updatedCurrAmount ?? true;
  } catch (error) {
    console.error("Error updating deposit status:", error);
    return false;
  }
};

export const setUserType = async ({
  user_id,
  group_id,
  user_type,
}: {
  user_id: number;
  group_id: number;
  user_type: 0 | 1;
}) => {
  try {
    const response: ResponseType[] = await sql`
UPDATE user_group
SET user_type = ${user_type}
WHERE user_id = ${user_id} and group_id = ${group_id};
    `;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const kickOutUserFromGroup = async ({
  user_id,
  group_id,
}: {
  user_id: number;
  group_id: number;
}) => {
  try {
    const response: ResponseType[] = await sql`
DELETE FROM user_group
WHERE user_id = ${user_id} and group_id = ${group_id};
    `;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
