"use server";
import { sql } from "@/utils/db";

export const retrieveAllUsers = async ({ group_id }: { group_id: number }) => {
  try {
    const response: any[] = await sql`
    select * from user_group
join "user" on "user".user_id = user_group.user_id 
where group_id = ${group_id}
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
