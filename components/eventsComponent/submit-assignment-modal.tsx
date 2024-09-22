import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EVENTS_USER } from "@/text/events";
import { BUTTONS } from "@/text/buttons";
import {
  createSubmission,
  updateSubmission,
  retrieveSubmissionsByUserEmailEventId,
} from "@/lib/actions/submission";
import { useEffect, useState } from "react";
import { SubmissionType } from "@/types/submission";
import { useToast } from "@/components/ui/use-toast";

interface SubmitAssignmentModalProps {
  userEmail: string | undefined | null;
  eventID: number;
  submitted: boolean;
}

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  userEmail,
  eventID,
  submitted,
}) => {
  const { toast } = useToast();

  const [originalSubmission, setOriginalSubmission] = useState<
    SubmissionType | undefined
  >(undefined);

  useEffect(() => {
    if (submitted) {
      const fetchData = async () => {
        try {
          const response = await retrieveSubmissionsByUserEmailEventId(
            userEmail,
            eventID
          );
          setOriginalSubmission(response[0]);
        } catch (error) {
          toast({ title: "Error", description: "Failed to load data" });
        }
      };

      fetchData();
    }
  }, [submitted, eventID, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      if (submitted) {
        await updateSubmission({
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          event_id: eventID,
          user_email: userEmail,
        });
      } else {
        await createSubmission({
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          event_id: eventID,
          user_email: userEmail,
        });
      }

      toast({
        title: "Success",
        description: "Submission created successfully",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create submission" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button className={`bg-violet-900 w-20`}>
            {!submitted ? BUTTONS.BUTTON_SUBMIT : BUTTONS.BUTTON_SUBMITTED}
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vh] h-[70vh]">
        <div className="relative">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-700">
              {EVENTS_USER.ASSIGNMENT_SUBMISSION_TITLE}
            </DialogTitle>
          </DialogHeader>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-6">
            <div className="grid gap-1.5">
              <Label htmlFor="question">{EVENTS_USER.ASSIGNMENT_TITLE}</Label>
              <Input
                id="question"
                name="title"
                placeholder={EVENTS_USER.ASSIGNMENT_TITLE_DESCRIPTION}
                defaultValue={originalSubmission?.title || ""}
                className="w-full my-2"
                maxLength={199}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="answer">{EVENTS_USER.ASSIGNMENT_CONTENT}</Label>
              <DialogDescription />
              <textarea
                id="answer"
                name="content"
                placeholder={EVENTS_USER.ASSIGNMENT_CONTENT_DESCRIPTION}
                defaultValue={originalSubmission?.content || ""}
                className="w-full h-56 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>
          </div>
          <DialogClose asChild>
            <DialogFooter>
              <Button type="submit">
                {originalSubmission
                  ? BUTTONS.BUTTON_UPDATE
                  : BUTTONS.BUTTON_SUBMIT}
              </Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
