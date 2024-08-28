"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setAttendance, setPR } from "@/lib/actions/attendance";
import { ATTENDANCE } from "@/text/attendance";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { AttendanceType } from "@/types/attendance";
import { retrieveAttendance } from "@/lib/actions/attendance";
import { ERROR } from "@/text/error";
import { PR } from "@/types/pr";

/**
 * AttendanceTable
 *
 * This component displays the attendance list for a selected event.
 * The component takes in the event_id and group_id as props and retrieves the attendance data from the database using the retrieveAttendance function.
 * The component displays the attendance data in a table, with columns for the user's name, whether they attended or not, whether they submitted a question, and whether they submitted a pull request.
 * The component also provides a button to check in or withdraw from the event.
 * The component is a stateful component and uses the useState hook to store the selected event and the attendance data in the component's state.
 * The component uses the useEffect hook to retrieve the data from the database when the component mounts and when the selected event changes.
 * The component uses the useToast hook to display error messages to the user.
 * The component is a client-side component and is rendered on the client-side.
 * The component is a part of the Next.js pages directory and is rendered on the server-side.
 */
export const AttendanceTable = ({
  event_id,
  group_id,
}: {
  event_id: number | undefined;
  group_id: number | undefined;
}) => {
  const { toast } = useToast();
  const [members, setMembers] = useState<AttendanceType[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<PR[]>([]);

  const fetchAttendance = async () => {
    const data = await retrieveAttendance({ event_id: event_id, group_id: group_id });
    setMembers(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, [event_id, group_id]);

  const handleAttendance = async ({
    user_id,
    event_id,
  }: {
    user_id: number;
    event_id: number;
  }) => {
    try {
      const response = await setAttendance({ user_id, event_id });
      if (!response) {
        toast({ title: ERROR.ERROR, description: ERROR.FAIL_TO_CHECK_IN });
        return;
      }
      toast({ title: ERROR.SUCCESS, description: ERROR.CHECK_IN_SUCCESS });
      fetchAttendance();
    } catch (error) {
      toast({ title: ERROR.ERROR, description: ERROR.FAIL_TO_CHECK_IN });
    }
  };

  const handlePR = async ({
    user_id,
    event_id,
  }: {
    user_id: number;
    event_id: number | undefined;
  }) => {
    try {
      if (!event_id) {
        toast({ title: ERROR.ERROR, description: ERROR.FAIL_TO_CHECK_IN });
        return;
      }
      const response = await setPR({ user_id, event_id });
      if (!response) {
        toast({ title: ERROR.ERROR, description: ERROR.FAIL_TO_CHECK_IN });
      }
      toast({ title: ERROR.SUCCESS, description: ERROR.CHECK_IN_SUCCESS });
      fetchAttendance();
    } catch (error) {
      toast({ title: ERROR.ERROR, description: ERROR.FAIL_TO_CHECK_IN });
    }
  };

  const I_AM_HERE_STATE = 0;
  const ATTENDED = 1;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{ATTENDANCE.NAME}</TableHead>
          <TableHead>{ATTENDANCE.SELF_CHECK_IN}</TableHead>
          <TableHead>{ATTENDANCE.INDIVIDUAL_QUESTION}</TableHead>
          <TableHead>{ATTENDANCE.PULL_REQUEST}</TableHead>
          <TableHead>{ATTENDANCE.CHECK}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((info) => (
          <TableRow key={info.user_group_id}>
            <TableCell className="font-medium">{info.name}</TableCell>
            <TableCell>
              {info.attended != null
                ? info.attended == I_AM_HERE_STATE
                  ? ATTENDANCE.I_AM_HERE
                  : ATTENDANCE.ATTENDED
                : ATTENDANCE.ABSENT}
            </TableCell>
            <TableCell>{info.submission_id != null ? "Yes" : "No"}</TableCell>
            <TableCell>
              {info.submitted ? (
                <Button onClick={() => handlePR({ user_id: info.user_id, event_id: event_id })} className="px-2 py-1 text-sm w-24" variant="secondary">
                  {ATTENDANCE.SUBMITTED}
                </Button>
              ) : (
                <Button onClick={() => handlePR({ user_id: info.user_id, event_id: event_id })} className="px-2 py-1 text-sm w-24" variant="outline">
                  {ATTENDANCE.CHECK}
                </Button>
              )}
            </TableCell>
            <TableCell>
              {info.attended != null ? (
                info.attended == ATTENDED ? (
                  <Button
                    className="px-2 py-1 text-sm w-24"
                    variant="secondary"
                    onClick={() =>
                      handleAttendance({
                        user_id: info.user_id,
                        event_id: info.event_id,
                      })
                    }
                  >
                    {ATTENDANCE.WITHDRAW}
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleAttendance({
                        user_id: info.user_id,
                        event_id: info.event_id,
                      })
                    }
                    variant="outline"
                    className="px-2 py-1 text-sm w-24"
                  >
                    {ATTENDANCE.CHECK}
                  </Button>
                )
              ) : (
                <Button
                  variant="destructive"
                  type="button"
                  disabled
                  className="px-2 py-1 text-sm w-24"
                >
                  {ATTENDANCE.ABSENT}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
