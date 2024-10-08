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
import moment from "moment";
import { AssignmentType } from "@/types/assignment";

interface SubmitAssignmentModalProps {
  name: String;
  topic: String;
  date: Date;
  zoomLink: String;
  assign: AssignmentType[];
}

export const EventDetailModal: React.FC<SubmitAssignmentModalProps> = ({
  name,
  topic,
  date,
  zoomLink,
  assign,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-7 text-blue-500 text-sm cursor-pointer hover:underline">
          {BUTTONS.BUTTON_SEE_PROJECT_DETAIL}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">{name}</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{moment(date).format("MMMM Do YYYY, h:mm a")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Topic:</span>
            <span>{topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Zoom Link:</span>
            <a
              href={zoomLink.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Join Meeting
            </a>
          </div>
          <div className="space-y-2">
            <span className="font-semibold">Assignments:</span>
            <ul className="list-disc pl-5 space-y-1">
              {assign.map(
                (assignment, index) =>
                  assignment && (
                    <li key={index}>
                      {assignment.content.startsWith("http") ? (
                        <a
                          href={assignment.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {`Assignment ${index + 1} Link`}
                        </a>
                      ) : (
                        assignment.content
                      )}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <DialogDescription />
        <DialogClose asChild>
          <DialogFooter className="p-6 pt-0">
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
              {BUTTONS.BUTTON_CLOSE}
            </Button>
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
