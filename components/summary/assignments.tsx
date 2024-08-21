"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONSTANTS } from "@/text/summary";

const tempAssignments = [
  { name: "Assignment 1", link: "#" },
  { name: "Assignment 2", link: "#" },
  { name: "Assignment 3", link: "#" },
];

export const Assignments = () => {
  return (
    <>
      <h2 className="text-lg font-bold">{CONSTANTS.ASSIGNMENTS_TITLE}</h2>
      <div className="space-y-4 mt-4">
        {tempAssignments.map((assignment, index) => (
          <Card key={index} className="flex justify-between items-center p-4">
            <div>
              <h3 className="text-sm font-semibold">{assignment.name}</h3>
            </div>
            <Button variant="default" size="sm" asChild>
              <a href={assignment.link}>Link</a>
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};
