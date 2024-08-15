import { AssignmentCard } from "./assignmentCard";
import { useEffect, useState } from "react";

// TODO: Fetch submission list
const tempAssignments = [
  {
    submissionId: "1",
    userName: "Chulsu",
    date: new Date(2024, 7, 15),
    title: "Two Sum",
    content: "blah blah"
  },
  {
    submissionId: "2",
    userName: "Mangu",
    date: new Date(2024, 7, 15),
    title: "Task Scheduler",
    content: "blah blah"
  },
  {
    submissionId: "3",
    userName: "Zzanggu",
    date: new Date(2024, 7, 15),
    title: "Find The Town Judge",
    content: "blah blah"
  },
  {
    submissionId: "4",
    userName: "Yuri",
    date: new Date(2024, 7, 15),
    title: "Two Sum2",
    content: "blah blah"
  },

];

export const Assignment = () => {
  return (
    <div className="lg:h-[80vh] md:h-[45vh] overflow-y-auto">
      {tempAssignments.map((assignment) => (
        <AssignmentCard key={assignment.submissionId} userName={assignment.userName} date={assignment.date} title={assignment.title} content={assignment.content}></AssignmentCard>
      ))}
    </div>
  );
};
