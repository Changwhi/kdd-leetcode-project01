import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONSTANTS } from "@/text/attendance";

const attendance = [
  {
    id: 1,
    name: "Chul Su",
    selfCheckIn: "Approved",
    individualQuestion: "Submitted",
    pr: true,
    attend: true,
  },
  {
    id: 2,
    name: "Jjan gu",
    selfCheckIn: "Approved",
    individualQuestion: "Submitted",
    pr: true,
    attend: true,
  },
  {
    id: 3,
    name: "Mang Gu",
    selfCheckIn: "Approved",
    individualQuestion: "Submitted",
    pr: true,
    attend: true,
  },
  {
    id: 4,
    name: "Yu ri",
    selfCheckIn: "Approved",
    individualQuestion: "Submitted",
    pr: true,
    attend: false,
  },
];

export const AttendanceTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{CONSTANTS.NAME}</TableHead>
          <TableHead>{CONSTANTS.SELF_CHECK_IN}</TableHead>
          <TableHead>{CONSTANTS.INDIVIDUAL_QUESTION}</TableHead>
          <TableHead>{CONSTANTS.PULL_REQUEST}</TableHead>
          <TableHead>{CONSTANTS.CHECK}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map((info) => (
          <TableRow key={info.id}>
            <TableCell className="font-medium">{info.name}</TableCell>
            <TableCell>{info.selfCheckIn}</TableCell>
            <TableCell>{info.individualQuestion}</TableCell>
            <TableCell>
              {info.pr ? (
                <Button className="px-2 py-1 text-sm w-24">Submitted</Button>
              ) : (
                <Button className="px-2 py-1 text-sm w-24" variant="outline">
                  Check
                </Button>
              )}
            </TableCell>
            <TableCell>
              {info.attend ? (
                <Button className="px-2 py-1 text-sm w-24" variant="destructive">
                  Withdraw
                </Button>
              ) : (
                <Button className="px-2 py-1 text-sm w-24">Attend</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
