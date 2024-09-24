"use client";
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
import { GROUP } from "@/text/group";
import { Label } from "@/components/ui/label";
import { createGroup } from "@/lib/actions/group";
import { Input } from "@/components/ui/input";

/**
 * A dialog that can be used to create a new group.
 *
 * It accepts an `email` prop which is the email of the user creating the group.
 *
 * The dialog has four fields: title, description, max participants, attendance deduction and assignment deduction.
 *
 * When the form is submitted, it will call `createGroup` with the form data and the email of the user creating the group.
 * If the group is created successfully, the dialog will close.
 *
 * @param email - The email of the user creating the group.
 */

export const CreateGroupButton = ({ email }: { email: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{GROUP.CREATE_BUTTON}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{GROUP.GROUP_TITLE}</DialogTitle>
          <DialogDescription>{GROUP.GROUP_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            await createGroup({
              formData: formData,
              email: email,
            });
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                {GROUP.TITLE}
              </Label>
              <Input
                id="title"
                className="col-span-3"
                name="title"
                placeholder="Group Title"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {GROUP.DESCRIPTION}
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Group Description"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxParticipants" className="text-right">
                {GROUP.MAX_PARTICIPANTS}
              </Label>
              <Input
                id="maxParticipants"
                className="col-span-3"
                name="maxParticipants"
                placeholder="e.g. 10 (participants)"
                type="number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalDeposit" className="text-right">
                {GROUP.TOTAL_DEPOSITS}
              </Label>
              <Input
                id="totalDeposit"
                className="col-span-3"
                name="totalDeposit"
                placeholder="e.g. 10 (CAD 10)"
                type="number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="initialDeduction" className="text-right">
                {GROUP.INITIAL_DEDUCTION}
              </Label>
              <Input
                id="initialDeduction"
                className="col-span-3"
                name="initialDeduction"
                placeholder="e.g. 10 (CAD 10)"
                type="number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attendanceDeduction" className="text-right">
                {GROUP.ATTENDANCE_DEDUCTION}
              </Label>
              <Input
                id="attendanceDeduction"
                className="col-span-3"
                name="attendanceDeduction"
                type="number"
                placeholder="e.g. 10 (CAD 10)"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignmentDeduction" className="text-right">
                {GROUP.ASSIGNMENT_DEDUCTION}
              </Label>
              <Input
                id="assignmentDeduction"
                className="col-span-3"
                name="assignmentDeduction"
                placeholder="e.g. 10 (CAD 10)"
                type="number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prDeduction" className="text-right">
                {GROUP.PR_DEDUCTION}
              </Label>
              <Input
                id="prDeduction"
                className="col-span-3"
                name="prDeduction"
                placeholder="e.g. 10 (CAD 10)"
                type="number"
                required
              />
            </div>
          </div>
          <DialogClose asChild>
            <DialogFooter>
              <Button type="submit">{GROUP.CREATE}</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
