import Members from "@/components/admin/members/";

export default function MembersPage({params}: {params: {groupId: string}}) {
  return <Members group_id={Number(params.groupId)}/>;
}
