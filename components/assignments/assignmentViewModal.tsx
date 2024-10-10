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
import { BUTTONS } from "@/text/buttons";

interface SubmitAssignmentModalProps {
  userName: String;
  date: Date;
  title: String;
  content: String;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const AssignmentViewModal: React.FC<SubmitAssignmentModalProps> = ({
  userName,
  date,
  title,
  content,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-7">
          <Button className="bg-violet-900 m-2 w-20">
            {BUTTONS.BUTTON_VIEW}
          </Button>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[100vh] min-h-[90vh] p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-700">
            {title}
          </DialogTitle>
          <div className="text-muted-foreground text-right text-sm">{`${userName} (${date.toLocaleDateString(
            undefined,
            options
          )})`}</div>
        </DialogHeader>
        <div className="mt-4 p-3 border space-y-5 min-h-[60vh] max-h-[70vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {content}
          </pre>
        </div>
        <DialogDescription />
        <DialogClose asChild>
          <DialogFooter>
            <Button>{BUTTONS.BUTTON_CLOSE}</Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
