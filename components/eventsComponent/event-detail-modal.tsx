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
  name: String;
  topic: String;
  date: Date;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const EventDetailModal: React.FC<SubmitAssignmentModalProps> = ({
  name,
  topic,
  date,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-7">
          <button>{BUTTONS.BUTTON_SEE_PROJECT_DETAIL}</button>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vh] w-[60vh] h-[50vh] p-10">
        <div className="relative">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-700">
              {`${name} - ${topic}`}
            </DialogTitle>
          </DialogHeader>
        </div>
        <div>
          <div className="text-muted-foreground text-right text-sm">{`${date.toLocaleDateString(
            undefined,
            options
          )}`}</div>
          <div className="mt-4 pt-3 space-y-5">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>{"AA"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>{"AAA"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>{"AAAAA"}</span>
            </div>
          </div>
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

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
