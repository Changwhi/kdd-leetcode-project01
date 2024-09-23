"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpDown, Maximize2 } from "lucide-react";
import { Event, User } from "@/types/summary";

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
  eventIndex?: number;
};

export default function SummaryTable({
  usersInGroup,
}: {
  usersInGroup: User[];
}) {
  const [users, setUsers] = useState<User[]>(usersInGroup);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (sortConfig.key === "name") {
          return sortConfig.direction === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortConfig.key === "deposit") {
          const aValue = a.events.reduce(
            (sum, event) => sum + event.deposit,
            0
          );
          const bValue = b.events.reduce(
            (sum, event) => sum + event.deposit,
            0
          );
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          const aValue =
            a.events[sortConfig.eventIndex!][sortConfig.key as keyof Event];
          const bValue =
            b.events[sortConfig.eventIndex!][sortConfig.key as keyof Event];
          if (sortConfig.key === "pullRequest") {
            return sortConfig.direction === "ascending"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue);
          } else if (sortConfig.key === "assignment") {
            return sortConfig.direction === "ascending"
              ? (aValue as string[]).length - (bValue as string[]).length
              : (bValue as string[]).length - (aValue as string[]).length;
          } else {
            return sortConfig.direction === "ascending"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue);
          }
        }
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  const requestSort = (key: string, eventIndex?: number) => {
    setSortConfig((prevConfig) => ({
      key,
      eventIndex,
      direction:
        prevConfig?.key === key &&
        prevConfig?.eventIndex === eventIndex &&
        prevConfig?.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const renderSortButton = (
    label: string,
    key: string,
    eventIndex?: number
  ) => (
    <Button
      variant="ghost"
      onClick={() => requestSort(key, eventIndex)}
      className="h-full w-full justify-start font-normal"
    >
      {label} <ArrowUpDown className="h-4 w-4 ml-1" />
    </Button>
  );

  const renderEventHeader = (eventIndex: number) => (
    <>
      <TableHead className="p-0 h-10">
        {renderSortButton("Pull Request", "pullRequest", eventIndex)}
      </TableHead>
      <TableHead className="p-0 h-10">
        {renderSortButton("Attendance", "attendance", eventIndex)}
      </TableHead>
      <TableHead className="p-0 h-10 border-r-2 border-gray">
        {renderSortButton("Assignment", "assignment", eventIndex)}
      </TableHead>
    </>
  );

  const renderEventData = (event: Event) => (
    <>
      <TableCell className="h-10 py-0">
        {event.pullRequest ? "Submitted" : "Not Submitted"}
      </TableCell>
      <TableCell className="h-10 py-0">
        {event.attendance === 0
          ? "Absent"
          : event.attendance === 1
          ? "Late"
          : "Attended"}
      </TableCell>
      <TableCell className="h-10 py-0 border-r-2 border-gray">
        {event.assignments.length === 0 ? "Not Submitted" : "Submitted"}
      </TableCell>
    </>
  );

  const TableContent = () => (
    <Table>
      <TableHeader>
        <TableRow className="h-10">
          <TableHead
            className="border-r-2 border-gray h-10"
            colSpan={2}
          ></TableHead>
          {users[0]?.events.map((_, index) => (
            <TableHead
              key={`event-header-${index}`}
              colSpan={3}
              className="text-center border-r-2 h-10"
            >
              Event {index + 1}
            </TableHead>
          ))}
        </TableRow>
        <TableRow>
          <TableHead className="p-0 h-10">
            {renderSortButton("Name", "name")}
          </TableHead>
          <TableHead className="p-0 h-10 border-r-2 border-gray">
            {renderSortButton("Deposit (CAD)", "deposit")}
          </TableHead>
          {users[0]?.events.map((_, index) => (
            <React.Fragment key={`event-header-row-${index}`}>
              {renderEventHeader(index)}
            </React.Fragment>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.user_id}>
            <TableCell className="h-10 py-0">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="h-10 py-0 border-r-2 border-gray">
              ${user.curr_amount === null ? 0 : user.curr_amount} CAD
            </TableCell>
            {user.events.map((event, index) => (
              <React.Fragment key={`${user.user_id}-event-${index}`}>
                {renderEventData(event)}
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto pb-10">
      <div className="flex justify-end items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Maximize2 className="mr-2 h-4 w-4" />
              Full Screen View
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-full overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle>Full Screen View</DialogTitle>
              <DialogDescription >
                {" "}
                 This is a full-screen view of the attendance summary.
              </DialogDescription>
            </DialogHeader>
            <TableContent />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <TableContent />
      </div>
    </div>
  );
}
