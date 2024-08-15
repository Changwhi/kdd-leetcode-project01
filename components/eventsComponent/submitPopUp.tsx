import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CONSTANTS } from "@/text/summary";
import { Dispatch, SetStateAction } from "react";

interface SubmitPopupProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const SubmitPopup: React.FC<SubmitPopupProps> = ({openModal, setOpenModal}) => {

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[90vh] h-[70vh]">
        <div className="relative">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-700">
              {CONSTANTS.ASSIGNMENT_SUBMISSION_TITLE}
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="grid gap-4 py-6">
          <div className="grid gap-1.5">
            <Label htmlFor="question">{CONSTANTS.ASSIGNMENT_TITLE}</Label>
            <Input
              id="question"
              placeholder={CONSTANTS.ASSIGNMENT_TITLE_DESCRIPTION}
              className="w-full my-2"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="answer">{CONSTANTS.ASSIGNMENT_CONTENT}</Label>
            <DialogDescription />
            <textarea
              id="answer"
              placeholder={CONSTANTS.ASSIGNMENT_CONTENT_DESCRIPTION}
              className="w-full h-56 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>setOpenModal(false)} className="">{CONSTANTS.BUTTON_SUBMIT}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};