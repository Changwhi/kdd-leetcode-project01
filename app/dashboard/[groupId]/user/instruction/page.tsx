import { Instruction } from "@/components/instruction";

export default function InstructionPage({
  params,
}: {
  params: { groupId: string };
}) {
  return <Instruction group_id={Number(params.groupId)} admin={false}/>
}
