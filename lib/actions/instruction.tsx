"use server";
import { InstructionCardProps, InstructionType } from "@/types/instruction";
import { sql } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const createInstruction = async (formData: InstructionCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    const content = formData.content;
    const group_id = formData.group_id;

    await sql`
      INSERT INTO instruction (content, date, group_id)
      VALUES (${content}, NOW(), ${group_id})
    `;
    revalidatePath(`/dashboard/admin/${group_id}/instruction`);
  } catch (error) {
    console.log(error);
  }
};

export const updateInstruction = async (formData: InstructionCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    const content = formData.content;
    const group_id = formData.group_id;

    await sql`
      UPDATE instruction
      SET date=NOW(), content=${content}
      WHERE group_id=${group_id}
    `;
    revalidatePath(`/dashboard/admin/${group_id}/instruction`);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveInstructionByGroupId = async (group_id: number) => {
  try {
    const response: InstructionType[] =
      await sql`SELECT * FROM instruction WHERE group_id=${group_id}`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};