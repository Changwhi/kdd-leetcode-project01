import { Button } from "@/components/ui/button";
import { Modal } from "./modal";

export function DetailEventModal({
  isOpen,
  onClose,
  info,
}: {
  isOpen: boolean;
  onClose: () => void;
  info: any;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">TBD</h2>
      <form className="space-y-4 gap-7">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h2 className="mr-4 font-bold">Event Name : </h2>
            <p>{info.title}</p>
          </div>
          <div className="flex flex-row">
            <h2 className="mr-4 font-bold">Date : </h2>
            <p>{info.date}</p>
          </div>
          <div className="flex flex-row">
            <h2 className="mr-4 font-bold">Description : </h2>
            <p>{info.description}</p>
          </div>
          <div className="flex flex-row">
            <h2 className="mr-4 font-bold">Link : </h2>
            <p>{info.link}</p>
          </div>
          <Button variant="default" onClick={onClose}>
            Close
          </Button>

        </div>
      </form>
    </Modal>
  );
}
