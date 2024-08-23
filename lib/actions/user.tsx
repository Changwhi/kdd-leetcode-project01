"use server";
import { sql } from "@/utils/db";
import { UserType } from "@/types/user";
import { ResponseType } from "@/types/response";

/**
 * Returns all users data in database
 *
 * @returns An array of users if users exist, otherwise empty array
 */
export const retrieveAllUsers = async () => {
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
 * Returns user data with given email in database
 *
 * @param email - User's email as a string
 * @returns A user object if user exists, otherwise null
 */
export const retrieveUser = async (email: string) => {
  try {
    const response: UserType[] =
      await sql`SELECT * FROM "user" WHERE email=${email}`;
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
 * Create new user in user table in database
 *
 * @param name - User's name as a string
 * @param email - User's email as a string
 * @returns a response object
 */
export const createUser = async (name: string, email: string) => {
  try {
    const response: ResponseType[] = await sql`
      INSERT INTO "user" (name, email)
      VALUES (${name}, ${email})
    `;
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete the user in user table in database
 *
 * @param email - User's email as a string
 * @returns a response object
 */
export const deleteUser = async (email: string) => {
  try {
    const response: ResponseType[] = await sql`
    DELETE FROM "user" WHERE email =  ${email}
    `;
    return response;
  } catch (error) {
    console.log(error);
  }
};
