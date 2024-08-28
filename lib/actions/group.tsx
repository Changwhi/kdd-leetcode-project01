"use server";
import { AttendanceType } from "@/types/attendance";
import { GroupType, MyGroup, otherGroup } from "@/types/group";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const getMyGroups = async ({ email }: {email: string}) => {
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
