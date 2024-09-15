"use server";
import { INSTRUCTION } from "@/text/instruction";

export default async function EventPage({
  params,
}: {
  params: { groupId: string };
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">{INSTRUCTION.INSTRUCTION_TITLE}</h2>
      <div className="space-y-4">
        
      </div>
    </div>
  );
}
