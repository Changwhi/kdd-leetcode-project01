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
import { Button } from "@/components/ui/button";

export default function InstructionPage({
  params,
}: {
  params: { groupId: string };
}) {
  const [value, setValue] = useState<string>("");
  const [isInstruction, setIsInstruction] = useState<boolean>(false);
  const [isEditMode, setisEditMode] = useState<boolean>(false);

  const fetchInstruction = async () => {
    const data = await retrieveInstructionByGroupId(parseInt(params.groupId));
    if (data.length > 0) {
      setValue(data[0].content);
      setIsInstruction(true);
    }
  };

  useEffect(() => {
    fetchInstruction();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isInstruction) {
        await updateInstruction({
          content: value,
          group_id: parseInt(params.groupId),
        });
      } else {
        await createInstruction({
          content: value,
          group_id: parseInt(params.groupId),
        });
        setIsInstruction(true);
      }
      toast({
        title: "Success",
        description: "Submission created successfully",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create submission" });
    }
  };

  const onClickEditMode = () => {
    setisEditMode(!isEditMode!);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">{INSTRUCTION.INSTRUCTION_TITLE}</h2>
        <Button
          variant="outline"
          className="hover:bg-gray-100 px-4 py-2 rounded"
          onClick={onClickEditMode}
        >
          Edit
        </Button>
      </div>
      <div className="space-y-4 m-5">
        {isEditMode && (
          <div className="mb-10">
            <form onSubmit={handleSubmit}>
              <MDEditor
                value={value}
                onChange={setValue}
                preview="edit"
                height={200}
              />
              <div className="flex justify-end">
                <Button type="submit" className="mt-2">
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
}
