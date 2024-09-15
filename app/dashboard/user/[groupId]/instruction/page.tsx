"use client";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "@/components/ui/use-toast";
import {
  createInstruction,
  retrieveInstructionByGroupId,
  updateInstruction,
} from "@/lib/actions/instruction";
import { INSTRUCTION } from "@/text/instruction";
import { useEffect, useState } from "react";
import { retrieveAttendance } from "@/lib/actions/attendance";

export default function EventPage({ params }: { params: { groupId: string } }) {
  const [value, setValue] = useState<string | undefined>("");

  const fetchInstruction = async () => {
    const data = await retrieveInstructionByGroupId( parseInt(params.groupId) );
    if (data.length > 0) {
      setValue(data[0].content);
    }
  };

  useEffect(() => {
    fetchInstruction();
  }, []);
  
  return (
    <div>
      <h2 className="text-lg font-bold">{INSTRUCTION.INSTRUCTION_TITLE}</h2>
      <div className="space-y-4 m-5">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
}
