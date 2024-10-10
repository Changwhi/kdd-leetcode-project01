"use client"
import { retrieveSubmissionsByEventID } from "@/lib/actions/submission";
import { AssignmentCard } from "./assignmentCard";
import { useEffect, useState } from "react";
import { SubmissionUserNameType } from "@/types/submission";

export const Assignment = ({ eventId }: { eventId: number }) => {
  const [assignments, setAssignments ] = useState([] as SubmissionUserNameType[]);

  useEffect(()=> {
    const fetchAssignments = async () => {
      const response = await retrieveSubmissionsByEventID(eventId);
      setAssignments(response);
    };
    if (eventId != -1) {
      fetchAssignments();
    }
  }, [eventId]);

  return (
    <>
      {assignments.length > 0 ? (
        <div className="lg:h-[80vh] md:h-[45vh] overflow-y-auto">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.submission_id}
              userName={assignment.user_name}
              date={assignment.date}
              title={assignment.title}
              content={assignment.content}
            ></AssignmentCard>
          ))}
        </div>
      ) : (
        <div className="flex text-xl items-center justify-center h-[70vh]">
          No assignments have been submitted for this event.
        </div>
      )}
    </>
  );
};
