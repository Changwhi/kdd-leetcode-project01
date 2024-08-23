import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ATTENDANCE } from "@/text/attendance";

export const AttendanceTable = ({members}: {members: any[]}) => {
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
          <TableRow key={info.id}>
            <TableCell className="font-medium">{info.name}</TableCell>
            <TableCell>{info.attended != null ? (
              info.attended == 0 ? "I'm here" : "Attended"
            ) : "Absent"}</TableCell>
            <TableCell>{info.submission_id != null ? "Yes" : "No"}</TableCell>
            <TableCell>
              {
                info.submitted ? (
                  <Button className="px-2 py-1 text-sm w-24" variant="secondary">
                    Submitted
                  </Button>
                ) : (
                  <Button className="px-2 py-1 text-sm w-24" variant="outline">
                    Check
                  </Button>
                )
              }
            </TableCell>
            <TableCell>
              {info.attended != null ? (
                info.attended == 1 ?
                  <Button className="px-2 py-1 text-sm w-24" variant="secondary">
                    Withdraw
                  </Button>
                  :
                  <Button variant="outline" className="px-2 py-1 text-sm w-24">Check</Button>
                
              ) : (
                <Button variant="destructive" type="button" disabled className="px-2 py-1 text-sm w-24">Absent</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
