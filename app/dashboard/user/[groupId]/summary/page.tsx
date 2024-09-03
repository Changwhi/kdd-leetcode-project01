import { Summary } from "@/components/summary";

export default function SummaryPage({params}: {params: {groupId: string}}) {
  return <Summary group_id={Number(params.groupId)} />;
}
