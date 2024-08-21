import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "./modal"; 

export function EventModal({ isOpen, submitFunction, onClose}: { isOpen: boolean; submitFunction: ({title, date, description, link} : any) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    submitFunction({ title, date, description, link });
    setTitle("");
    setDate("");
    setDescription("");
    setLink("");

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">Create Event</h2>
      <form className="space-y-4">
        <Input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Event Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
