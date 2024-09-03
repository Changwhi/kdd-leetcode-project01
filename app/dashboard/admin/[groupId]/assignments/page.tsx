import { Assignments } from "@/components/assignments";

export default function Assignment({params}: {params: {groupId: string}}) {
  return <Assignments group_id={Number(params.groupId)}/>;
}