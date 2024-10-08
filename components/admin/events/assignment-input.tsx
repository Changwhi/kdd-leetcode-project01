"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Undo2
} from "lucide-react";
import { EVENTS } from "@/text/events";

// Character limits for input fields
const charLimits = {
  name: 20,
  topic: 20,
  zoomlink: 200,
  assignment: 200,
};

export const AssignmentInput = ({
  index,
  eventAssignments,
  setEventAssignments,
  deleteAssignmentIds,
  assignment,
  setDeleteAssignmentIds,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`assign${index}`} className="text-sm font-medium">
        {EVENTS[`ASSIGNMENT_1` as keyof typeof EVENTS]}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id={`assign${index}`}
          value={eventAssignments[index].content}
          onChange={(e) => {
            const newAssignments = [...eventAssignments];
            newAssignments[index].content = e.target.value;
            setEventAssignments(newAssignments);
          }}
          name={`assign${index}`}
          maxLength={charLimits.assignment}
          className={`w-full ${
            deleteAssignmentIds.includes(assignment.id) ? "opacity-50" : ""
          }`}
          disabled={deleteAssignmentIds.includes(assignment.id)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            if (deleteAssignmentIds.includes(assignment.id)) {
              setDeleteAssignmentIds((ids) =>
                ids.filter((id) => id !== assignment.id)
              );
            } else {
              setDeleteAssignmentIds((ids) => [...ids, assignment.id]);
            }
          }}
          aria-label={
            deleteAssignmentIds.includes(assignment.id)
              ? "Undo delete assignment"
              : "Delete assignment"
          }
        >
          {deleteAssignmentIds.includes(assignment.id) ? (
            <Undo2 className="w-5 h-5 text-green-500" />
          ) : (
            <Trash2 className="w-5 h-5 text-red-500" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-right">
        {eventAssignments[index]?.content.length || 0}/{charLimits.assignment}
      </p>
    </div>
  );
};
