"use server";
import { sql } from "@/utils/db";
export const retrieveAllUsers = async ({ group_id }: { group_id: number }) => {
  try {
    const response: any[] = await sql`
      SELECT 
        u.user_id, 
        u.name, 
        u.email, 
        ug.curr_amount,
        ug.deposit_status,
        ug.user_type,
        COALESCE(
          json_agg(
            json_build_object(
              'event_id', e.event_id,
              'event_name', e.name,
              'pullRequest', COALESCE(pr.submitted, false),
              'attendance', a.attended,
              'assignments', COALESCE(s.submission_id, 0),
              'deposit', COALESCE(ug.curr_amount, 0)
            ) 
            ORDER BY e.date
          ) 
          FILTER (WHERE e.event_id IS NOT NULL), '[]'
        ) AS events
      FROM 
        "user" u
      JOIN 
        user_group ug ON u.user_id = ug.user_id AND ug.group_id = ${group_id}
      LEFT JOIN 
        event e ON ug.group_id = e.group_id
      LEFT JOIN 
        pr ON u.user_id = pr.user_id AND e.event_id = pr.event_id
      LEFT JOIN 
        attendance a ON u.user_id = a.user_id AND e.event_id = a.event_id
      LEFT JOIN 
        submission s ON u.user_id = s.user_id AND e.event_id = s.event_id
      GROUP BY 
        u.user_id, u.name, u.email, ug.curr_amount, deposit_status, ug.user_type;
    `;

    if (response) {
      return response;
    }
    return [];
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    return error.message;
  }
};
