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
import { CONSTANTS } from "@/text/summary";

const usersInfo = [
  {
    id: 1,
    name: "Chul Su",
    email: "ChulSu@abc.com",
    level: "Novice",
    deposit: "30",
  },
  {
    id: 2,
    name: "Jjan gu",
    email: "Jjang Gu@abc.com",
    level: "Intermeidate",
    deposit: "25",
  },
  {
    id: 3,
    name: "Mang Gu",
    email: "Mang Gu@abc.com",
    level: "Advanced",
    deposit: "20",
  },
  { id: 4, name: "Yu ri", email: "Yu ri", level: "Master", deposit: "30" },
];

export const SummaryTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{CONSTANTS.NAME}</TableHead>
          <TableHead>{CONSTANTS.EMAIL}</TableHead>
          <TableHead>{CONSTANTS.LEVEL}</TableHead>
          <TableHead>{CONSTANTS.DEPOSIT}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersInfo.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.level}</TableCell>
            <TableCell>{user.deposit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
