"use client";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (formData) => {
            await addEvent({
              name: formData.get("name") as string,
              date: formData.get("date") as string,
              topic: formData.get("topic") as string,
              zoomlink: formData.get("zoomlink") as string,
              group_id: 1 as number,
              event_id: 0,
            });
            revalidatePath("/dashboard/admin/events");
          }}
        >
          <div className="flex flex-col justfy-start items-center gap-4 py-4">
            {/* <Label htmlFor="name" className="text-right">
                      Event Title:
                    </Label> */}
            <Input placeholder="Event Title" name="name" />
            {/* <Label htmlFor="username" className="text-right">
                      Date:
                    </Label> */}
            <Input type="date" name="date" />
            {/* <Label htmlFor="Event Description" className="text-right">
                      Event Description:
                    </Label> */}
            <Input placeholder="Event Description" name="topic" />
            {/* <Label htmlFor="Event Link" className="text-right">
                      Event Link:
                    </Label> */}
            <Input placeholder="Event Link" name="zoomlink" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
