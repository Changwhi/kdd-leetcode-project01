"use server";
import { sql } from "@/utils/db";
import { UserType } from "@/types/user";
import { ResponseType } from "@/types/response";
import { getSession } from "@auth0/nextjs-auth0";
import { deleteAllAttendanceByEmail, deleteAllPRByEmail } from "./attendance";
import { deleteUserGroupByEmail } from "./usergroup";
import { deleteAllSubmissionsByEmail } from "./submission";
import { deleteAllAssignmentsByEmail } from "./assignment";

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
 * Update user name in the database by email
 *
 * @param email - User's email as a string
 * @param newName - User's new name as a string
 * @returns a success message or an error message
 */
export const updateUserName = async (
  email: string,
  newName: string
): Promise<string> => {
  try {
    await sql`
    UPDATE "user"
    SET name = ${newName}
    WHERE email = ${email};
  `;
    return "User name updated successfully.";
  } catch (error) {
    console.error("Error retrieving user:", error);
    return "Failed to update user name.";
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
 * @param {string} email - User's email as a string
 * @returns a success message or an error message
 */
export const deleteUser = async (email: string): Promise<string> => {
  try {
    await deleteAllAttendanceByEmail(email);
    await deleteAllPRByEmail(email);
    await deleteUserGroupByEmail(email);
    await deleteAllSubmissionsByEmail(email);
    await deleteAllAssignmentsByEmail(email);

    await sql`
    DELETE FROM "user" WHERE email =  ${email}
    `;

    // Get Auth0 token and delete user from Auth0
    const token = await getAuth0Token();
    await deleteAuth0User(email, token);

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


/**
 * Get auth0 token
 */
const getAuth0Token = async (): Promise<string> => {
  try {
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: "client_credentials",
      }),
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to get Auth0 token", error);
    throw new Error("Failed to get Auth0 token");
  }
};

/**
 * Delete the user from Auth0
 */
const deleteAuth0User = async (email: string, token: string) => {
  try {
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;

    // Fetch user's id
    const response = await fetch(
      `${auth0Domain}/api/v2/users-by-email?email=${email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    
    const userData = await response.json();
    const userId = userData[0]?.user_id;

    // Delete user account
    if (userId) {
      await fetch(`${auth0Domain}/api/v2/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
  } catch (error) {
    console.error("Failed to delete Auth0 user", error);
    throw new Error("Failed to delete Auth0 user");
  }
};
