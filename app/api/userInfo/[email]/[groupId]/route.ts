// pages/api/check-admin.ts
import { sql } from "@/utils/db";
import { UserRoleType } from '@/types/user';
import { NextResponse } from 'next/server';
export async function GET(
  request: Request,
  { params }: { params: { email: string; groupId: string } }
) {
  try {
    const { email, groupId } = params;

    const response: UserRoleType[] =
      await sql`SELECT u.user_id, ug.group_id, ug.user_type 
      FROM "user_group" ug
      JOIN "user" u ON u.email=${email}
      WHERE ug.group_id = ${groupId} AND ug.user_id = u.user_id`;

      return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

