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
import { createSubmission } from "@/lib/actions/submission";

interface SubmitAssignmentModalProps {
  isPast: boolean;
  eventID: number;
  submitted: boolean;
}

//TODO: hardcoded, need to make it dynamically
const USER_ID: number = 2;

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  isPast,
  eventID,
  submitted,
}) => {
  const assignmentColour: string =
    submitted || !isPast ? "bg-violet-900" : "bg-orange-500";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isPast} className={`${assignmentColour} w-20`}>
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
        <form
          className="space-y-4"
          method="POST"
          action={async (formData: FormData) => {
            await createSubmission({
              title: formData.get("title") as string,
              content: formData.get("content") as string,
              event_id: eventID,
              user_id: USER_ID,
            });
          }}
        >
          <div className="grid gap-4 py-6">
            <div className="grid gap-1.5">
              <Label htmlFor="question">{EVENTS_USER.ASSIGNMENT_TITLE}</Label>
              <Input
                id="question"
                name="title"
                placeholder={EVENTS_USER.ASSIGNMENT_TITLE_DESCRIPTION}
                className="w-full my-2"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="answer">{EVENTS_USER.ASSIGNMENT_CONTENT}</Label>
              <DialogDescription />
              <textarea
                id="answer"
                name="content"
                placeholder={EVENTS_USER.ASSIGNMENT_CONTENT_DESCRIPTION}
                className="w-full h-56 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>
          </div>
          <DialogClose asChild>
            <DialogFooter>
              <Button type="submit">{BUTTONS.BUTTON_SUBMIT}</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
