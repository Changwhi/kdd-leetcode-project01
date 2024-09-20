import { ParticipantsIcon } from "@/components/attendance/icons/participantsIcon";
import { AttendedIcon } from "@/components/attendance/icons/attendedIcon";
import { AbsentIcon } from "@/components/attendance/icons/absentIcon";

import { Card } from "@/components/ui/card";
import { ATTENDANCE } from "@/text/attendance";
import { AttendanceType } from "@/types/attendance";
export const AttendanceCard = ({
  attendance,
}: {
  attendance: AttendanceType[];
}) => {
  return (
    <div className="flex gap-4 p-5">
      <Card className="w-40 p-4 ">
        <div className="flex gap-2 items-center">
          <ParticipantsIcon />
          <h3 className="text-xs text-muted-foreground">
            {ATTENDANCE.TOTAL_PARTICIPANTS}
          </h3>
        </div>
        <p className="pt-3 text-center text-base font-semibold">
          {attendance.length}
          {ATTENDANCE.PEOPLE}
        </p>
      </Card>
      <Card className="w-40 p-4 ">
        <div className="flex gap-2 items-center">
          <AttendedIcon />
          <h3 className="text-xs text-muted-foreground">{ATTENDANCE.ATTEND}</h3>
        </div>
        <p className="pt-3 text-center text-base font-semibold">
          {attendance.filter((member) => member.attended === 1 || member.attended === 2).length}{" "}
          {ATTENDANCE.PEOPLE}
        </p>
      </Card>
      <Card className="w-40 p-4 ">
        <div className="flex gap-2 items-center">
          <AbsentIcon />
          <h3 className="text-xs text-muted-foreground">{ATTENDANCE.ABSENT}</h3>
        </div>
        <p className="pt-3 text-left text-base font-semibold">
          {attendance.length -
            attendance.filter((member) => member.attended === 1 || member.attended === 2).length}{" "}
          {ATTENDANCE.PEOPLE}
        </p>
      </Card>
    </div>
  );
};
