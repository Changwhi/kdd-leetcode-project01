"use server";
import { Button } from "@/components/ui/button";
import { EventCardProps } from "@/types/event";
import { EVENTS } from "@/text/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EventCard: React.FC<EventCardProps> = ({
  event_id,
  name,
  date,
  topic,
  zoomlink,
}) => {

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg min-w-full max-w-xs mx-auto hover:shadow-xl transition-all duration-200">
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex flex-col flex-grow p-4">
          <hr className="w-full border-gray-300" />
          <h2 className="h-20 overflow-y-hidden text-xl font-semibold hover:text-gray-700 duration-200">
            {name}
          </h2>
          <hr className="w-full border-gray-300" />
          <h3 className="text-xs text-gray-500 hover:text-gray-600 transition-all duration-200">
            {date.toString()}
          </h3>
          <hr className="w-full border-gray-300" />
          <p className="h-16 mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200 flex-grow">
            {topic}
          </p>
          <div>
            <a
              className="text-muted-foreground underline"
              href={zoomlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {EVENTS.LINK}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2 space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save whenre
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h2 className="mr-4 font-bold">Event Name : </h2>
                    <p>{name}</p>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="mr-4 font-bold">Date : </h2>
                    <p>{date}</p>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="mr-4 font-bold">Description : </h2>
                    <p>{topic}</p>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="mr-4 font-bold">Link : </h2>
                    <p>{zoomlink}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
