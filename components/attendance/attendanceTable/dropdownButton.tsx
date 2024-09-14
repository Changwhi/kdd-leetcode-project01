import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { forceAttendance } from "@/lib/actions/attendance";
import { GROUP } from "@/text/group";
import { useEffect } from "react";

export function DropdownButton({
  user_id,
  event_id,
}: {
  user_id: number;
  event_id: number;
}) {
    useEffect(() => {
        console.log(event_id)
    })
  const ATTENDED = 1;
  const LATE = 2;
  const ABSENT = 0;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              forceAttendance({
                user_id: user_id,
                event_id: event_id,
                attendance_status: ATTENDED,
              });
            }}
          >
            {GROUP.MARKED_AS_ATTENDED}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              forceAttendance({
                user_id: user_id,
                event_id: event_id,
                attendance_status: ABSENT,
              });
            }}
          >
            {GROUP.MARKED_AS_ABSENT}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              forceAttendance({
                user_id: user_id,
                event_id: event_id,
                attendance_status: LATE,
              });
            }}
          >
            {GROUP.MARKED_AS_LATE}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
