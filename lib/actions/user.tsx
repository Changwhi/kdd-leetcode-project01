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

export const getLoggedInUser = async () => {
  const session = await getSession();
  const user = session?.user;
  return user;
};
