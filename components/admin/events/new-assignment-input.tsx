"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, Undo2 } from "lucide-react";
import { EVENTS } from "@/text/events";

// Character limits for input fields
const charLimits = {
  name: 20,
  topic: 20,
  zoomlink: 200,
  assignment: 200,
};

export const NewAssignmentInput = ({
  index,
  newAssignments,
  setNewAssignments,
  currAssignment,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`assign${index}`} className="text-sm font-medium">
        {EVENTS[`ASSIGNMENT_1` as keyof typeof EVENTS]}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id={`newAssign${index}`}
          value={newAssignments[index]}
          onChange={(e) => {
            const tempNewAssignments = [...newAssignments];
            tempNewAssignments[index] = e.target.value;
            setNewAssignments(tempNewAssignments);
          }}
          name={`newAssign${index}`}
          maxLength={charLimits.assignment}
          className={`w-full`}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setNewAssignments((prevAssignments) => {
              const updatedAssignments = [...prevAssignments];
              updatedAssignments.splice(index, 1);
              return updatedAssignments;
            })
            
          }}
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-right">
        {newAssignments[index]?.length || 0}/{charLimits.assignment}
      </p>
    </div>
  );
};
