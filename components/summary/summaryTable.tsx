"use server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SUMMARY } from "@/text/summary";
import { AttendanceType } from "@/types/attendance";

export const SummaryTable = ({users}: {users: AttendanceType[]}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{SUMMARY.NAME}</TableHead>
          <TableHead>{SUMMARY.EMAIL}</TableHead>
          <TableHead>{SUMMARY.LEVEL}</TableHead>
          <TableHead>{SUMMARY.DEPOSIT}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_group_id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.user_type == 1 ? "User" : "Admin"}</TableCell>
            <TableCell>{user.curr_amout}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
