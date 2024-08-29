import { retrieveSubmissionsByEventID } from "@/lib/actions/submission";
import { AssignmentCard } from "./assignmentCard";

export const Assignment = async ({ event_id }: { event_id: number}) => {
  const assignments = await retrieveSubmissionsByEventID(event_id);
  return (
    <div className="lg:h-[80vh] md:h-[45vh] overflow-y-auto">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.submission_id} userName={assignment.user_name} date={assignment.date} title={assignment.title} content={assignment.content}></AssignmentCard>
      ))}
    </div>
  );
};
