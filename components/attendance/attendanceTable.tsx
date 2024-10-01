"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AttendanceType } from "@/types/attendance";
import {
  retrieveAttendance,
  forceAttendance,
  setPR,
} from "@/lib/actions/attendance";
import { ATTENDANCE } from "@/text/attendance";
import { ERROR } from "@/text/error";
import { GROUP } from "@/text/group";
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  HelpCircle,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * AttendanceTable component
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
  const [filteredMembers, setFilteredMembers] = useState<AttendanceType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AttendanceType;
    direction: "ascending" | "descending";
  } | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [questionFilter, setQuestionFilter] = useState("all");
  const [prFilter, setPrFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttendance = useCallback(async () => {
    if (event_id && group_id) {
      setIsLoading(true);
      try {
        const data = await retrieveAttendance({ event_id, group_id });
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        toast({
          title: ERROR.ERROR,
          description: "Failed to fetch attendance data.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [event_id, group_id, toast]);

  useEffect(() => {
    fetchAttendance();
  }, [event_id, group_id, fetchAttendance]);

  useEffect(() => {
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (attendanceFilter === "all" ||
          (attendanceFilter === "attended" && member.attended === 1) ||
          (attendanceFilter === "late" && member.attended === 2) ||
          (attendanceFilter === "absent" &&
            (member.attended === 0 || member.attended === null))) &&
        (questionFilter === "all" ||
          (questionFilter === "submitted" && member.submission_id !== null) ||
          (questionFilter === "notSubmitted" &&
            member.submission_id === null)) &&
        (prFilter === "all" ||
          (prFilter === "submitted" && member.submitted) ||
          (prFilter === "notSubmitted" && !member.submitted))
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members, attendanceFilter, questionFilter, prFilter]);

  const handleAction = async (action: string, user_id: number) => {
    if (!event_id) {
      toast({ title: ERROR.ERROR, description: "Event ID is missing." });
      return;
    }

    const currentMember = members.find((member) => member.user_id === user_id);
    if (!currentMember) return;

    switch (action) {
      case "attended":
        if (currentMember.attended === 1) {
          toast({
            title: "Already attended",
            description: "This user is already marked as attended.",
          });
          return;
        }
        break;
      case "absent":
        if (currentMember.attended === 0) {
          toast({
            title: "Already absent",
            description: "This user is already marked as absent.",
          });
          return;
        }
        break;
      case "late":
        if (currentMember.attended === 2) {
          toast({
            title: "Already late",
            description: "This user is already marked as late.",
          });
          return;
        }
        break;
      case "pr_created":
        if (currentMember.submitted === true) {
          toast({
            title: "PR Already Created",
            description: "This user's PR has already been created.",
          });
          return;
        }
        break;
      case "pr_not_created":
        if (currentMember.submitted === false) {
          toast({
            title: "PR Already Not Created",
            description: "This user's PR is already marked as not created.",
          });
          return;
        }
        break;
      default:
        throw new Error("Invalid action");
    }

    setIsLoading(true);
    try {
      let response;
      switch (action) {
        case "attended":
          response = await forceAttendance({
            user_id,
            event_id,
            attendance_status: 1,
          });
          break;
        case "absent":
          response = await forceAttendance({
            user_id,
            event_id,
            attendance_status: 0,
          });
          break;
        case "late":
          response = await forceAttendance({
            user_id,
            event_id,
            attendance_status: 2,
          });
          break;
        case "pr_created":
          response = await setPR({ user_id, event_id, submitted: true });
          break;
        case "pr_not_created":
          response = await setPR({ user_id, event_id, submitted: false });
          break;
        default:
          throw new Error("Invalid action");
      }

      if (response) {
        toast({ title: ERROR.SUCCESS, description: ERROR.ACTION_SUCCESS });
        await fetchAttendance();
      } else {
        throw new Error("Action failed");
      }
    } catch (error) {
      toast({
        title: ERROR.ERROR,
        description:
          error instanceof Error ? error.message : ERROR.ACTION_FAILED,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestSort = (key: keyof AttendanceType) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig !== null) {
      const sortedMembers = [...filteredMembers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredMembers(sortedMembers);
    }
  }, [sortConfig, filteredMembers]);

  const SortIcon = ({ columnKey }: { columnKey: keyof AttendanceType }) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === "ascending" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      );
    }
    return null;
  };

 const StatusIcon = ({ status }: { status: boolean | number | null }) => {
  if (status === null) {
    return <HelpCircle className="w-4 h-4 text-gray-500" />; // Question mark icon for not checked
  }
  if (status === 1) return <Check className="w-4 h-4 text-green-500" />;
  if (status === 2) return <HelpCircle className="w-4 h-4 text-yellow-500" />;
  if (status === 0) return <X className="w-4 h-4 text-red-500" />;
  return <X className="w-4 h-4 text-gray-500" />; // Use gray for unknown status
};


  const PRStatusIcon = ({ submitted }: { submitted: boolean | null }) => {
    if (submitted === null)
      return <HelpCircle className="w-4 h-4 text-gray-500" />; // Undecided
    return submitted ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={setAttendanceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Attendance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Attendance</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setQuestionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Question" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Questions</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="notSubmitted">Not Submitted</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setPrFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter PR" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All PRs</SelectItem>
            <SelectItem value="submitted">Created PR</SelectItem>
            <SelectItem value="notSubmitted">Not Created PR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => requestSort("name")}
              className="cursor-pointer"
            >
              {ATTENDANCE.NAME} <SortIcon columnKey="name" />
            </TableHead>
            <TableHead
              onClick={() => requestSort("attended")}
              className="cursor-pointer"
            >
              {ATTENDANCE.ATTENDANCE} <SortIcon columnKey="attended" />
            </TableHead>
            <TableHead
              onClick={() => requestSort("submission_id")}
              className="cursor-pointer"
            >
              {ATTENDANCE.INDIVIDUAL_QUESTION}{" "}
              <SortIcon columnKey="submission_id" />
            </TableHead>
            <TableHead
              onClick={() => requestSort("submitted")}
              className="cursor-pointer"
            >
              {ATTENDANCE.PULL_REQUEST} <SortIcon columnKey="submitted" />
            </TableHead>
            <TableHead>{ATTENDANCE.ACTIONS}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((info) => (
            <TableRow key={info.user_group_id}>
              <TableCell className="font-medium">{info.name}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <StatusIcon status={info.attended} />
                  {info.attended === null
                    ? ATTENDANCE.UNCHECKED
                    : info.attended === 1
                    ? ATTENDANCE.ATTENDED
                    : info.attended === 2
                    ? ATTENDANCE.LATE
                    : ATTENDANCE.ABSENT}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <StatusIcon status={info.submission_id !== null} />
                  {info.submission_id !== null ? "Submitted" : "Not Submitted"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <PRStatusIcon submitted={info.submitted} />
                  {info.submitted === null
                    ? ATTENDANCE.UNCHECKED
                    : info.submitted
                    ? ATTENDANCE.CREATED_PR
                    : ATTENDANCE.NOT_CREATED_PR}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      disabled={isLoading}
                    >
                      <span className="sr-only">Open menu</span>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreHorizontal className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleAction("attended", info.user_id)}
                      disabled={info.attended === 1} // Disable if already marked as attended
                    >
                      {info.attended === 1
                        ? "Already Attended"
                        : GROUP.MARKED_AS_ATTENDED}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction("late", info.user_id)}
                      disabled={info.attended === 2} // Disable if already marked as late
                    >
                      {info.attended === 2
                        ? "Already Late"
                        : GROUP.MARKED_AS_LATE}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction("absent", info.user_id)}
                      disabled={info.attended === 0} // Disable if already marked as absent
                    >
                      {info.attended === 0
                        ? "Already Absent"
                        : GROUP.MARKED_AS_ABSENT}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleAction("pr_created", info.user_id)}
                      disabled={info.submitted === true} // Disable if PR is already created
                    >
                      {info.submitted
                        ? "PR Already Created"
                        : "Mark PR as Submitted"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAction("pr_not_created", info.user_id)
                      }
                      disabled={info.submitted === false} // Disable if PR is already not created
                    >
                      {info.submitted === false
                        ? "PR Not Created"
                        : "Mark PR as Not Submitted"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
