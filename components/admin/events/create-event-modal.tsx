"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { addEvent } from "@/lib/actions/event";
import { EVENTS } from "@/text/events";

export const CreateEventModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{EVENTS.CREATENEWEVENT}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{EVENTS.DIALOG_TITLE}</DialogTitle>
          <DialogDescription>
          {EVENTS.DIALOG_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            await addEvent({
              name: formData.get("name") as string,
              date: formData.get("date") as string,
              topic: formData.get("topic") as string,
              zoomlink: formData.get("zoomlink") as string,
              group_id: 1 as number,
              event_id: 0,
            });
          }}
        >
          <div className="flex flex-col justfy-start items-center gap-4 py-4">
            <Input placeholder="Event Title" name="name" />
            <Input type="date" name="date" />
            <Input placeholder="Event Description" name="topic" />
            <Input placeholder="Event Link" name="zoomlink" />
          </div>
          <DialogClose asChild>
            <DialogFooter>
              <Button type="submit">{EVENTS.CREATE}</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
