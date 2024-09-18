import { Assignments } from "@/components/assignments";

export default function AssignmentsPage({ params }: { params: { groupId: string } }) {
  return <Assignments group_id={Number(params.groupId)}/>;
}
