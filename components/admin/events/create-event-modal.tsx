import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "./modal";
import { addEvent } from "@/lib/actions/event";

export function EventModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  submitFunction: ({ title, date, description, link }: any) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">Create Event</h2>
      <form
        ref={ref}
        className="space-y-4"
        action={async (formData) => {
          ref.current?.reset();
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
        <Input placeholder="Event Title" name="name" />
        <Input type="date" name="date" />
        <Input placeholder="Event Description" name="topic" />
        <Input placeholder="Event Link" name="zoomlink" />
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
