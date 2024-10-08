"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, Users, Mail, Filter, ArrowUpDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttendanceType } from "@/types/attendance";
import {
  kickOutUserFromGroup,
  setDepositStatus,
  setUserType,
} from "@/lib/actions/user";
import { useToast } from "@/components/ui/use-toast";

type DepositStatus = "Received" | "Pending" | "Returned";
type UserType = 0 | 1;
type SortField =
  | "name"
  | "email"
  | "deposit_status"
  | "curr_amount"
  | "user_type";
type SortOrder = "asc" | "desc";

export default function UserTable({
  usersInGroup,
  group_id,
}: {
  usersInGroup: AttendanceType[];
  group_id: number;
}) {
  const [users, setUsers] = useState<AttendanceType[]>(
    usersInGroup.map((user) => ({
      ...user,
      deposit_status:
        user.deposit_status !== null && user.deposit_status !== undefined
          ? user.deposit_status
          : "Pending",
    }))
  );

  const { toast } = useToast();

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    deposit_status: "all",
  });

  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: "name",
    order: "asc",
  });

  const [showWarning, setShowWarning] = useState<number | null>(null);

  const handleDepositStatusChange = async (
    userId: number,
    groupId: number,
    newStatus: DepositStatus
  ) => {
    const response = await setDepositStatus({
      user_id: userId,
      group_id: groupId,
      status: newStatus,
    });

    if (response) {
      setUsers(
        users.map((user) =>
          user.user_id === userId
            ? {
                ...user,
                deposit_status: newStatus,
                curr_amount:
                  newStatus === "Received"
                    ? Number(user.init_amount || 0) -
                      Number(user.init_deduction || 0)
                    : user.curr_amount,
              }
            : user
        )
      );
      toast({
        title: "Success",
        description: "Deposit status updated successfully.",
        variant: "default",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update deposit status.",
        variant: "destructive",
        duration: 3000,
      });
    }
    setShowWarning(null);
  };

  const handleUserTypeChange = async (
    userId: number,
    groupId: number,
    newUserType: UserType
  ) => {
    const response = await setUserType({
      user_id: userId,
      group_id: groupId,
      user_type: newUserType,
    });
    if (response) {
      setUsers(
        users.map((user) =>
          user.user_id === userId ? { ...user, user_type: newUserType } : user
        )
      );
      toast({
        title: "Success",
        description: "User type updated successfully.",
        variant: "default",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update user type.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleKickOut = async (userId: number, groupId: number) => {
    const response = await kickOutUserFromGroup({
      user_id: userId,
      group_id: groupId,
    });
    if (response) {
      setUsers(users.filter((user) => user.user_id !== userId));
      toast({
        title: "Success",
        description: "User kicked out successfully.",
        variant: "default",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to kick out user.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      order:
        prevConfig.field === field && prevConfig.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
          (filters.deposit_status === "all" ||
            user.deposit_status === filters.deposit_status)
      )
      .sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field])
          return sortConfig.order === "asc" ? -1 : 1;
        if (a[sortConfig.field] > b[sortConfig.field])
          return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
  }, [users, filters, sortConfig]);

  const StatusBadge = ({ status }: { status: DepositStatus }) => {
    const colorMap: Record<DepositStatus, string> = {
      Received: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Returned: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={`${colorMap[status]} font-semibold`}>{status}</Badge>
    );
  };

  const UserTypeBadge = ({ userType }: { userType: UserType }) => {
    const colorMap: Record<UserType, string> = {
      0: "bg-purple-100 text-purple-800",
      1: "bg-blue-100 text-blue-800",
    };

    return (
      <Badge className={`${colorMap[userType]} font-semibold`}>
        {userType === 0 ? "Admin" : "User"}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative">
          <Input
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="pl-10"
          />
          <Users
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div className="relative">
          <Input
            placeholder="Filter by email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            className="pl-10"
          />
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div className="relative">
          <Select
            value={filters.deposit_status}
            onValueChange={(value) =>
              setFilters({ ...filters, deposit_status: value })
            }
          >
            <SelectTrigger className="w-[200px] pl-10">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="font-bold hover:bg-transparent"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("email")}
                  className="font-bold hover:bg-transparent"
                >
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("deposit_status")}
                  className="font-bold hover:bg-transparent"
                >
                  Deposit Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("curr_amount")}
                  className="font-bold hover:bg-transparent"
                >
                  Current Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("user_type")}
                  className="font-bold hover:bg-transparent"
                >
                  User Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <>
                <TableRow key={user.user_id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.deposit_status} />
                  </TableCell>
                  <TableCell>
                    ${user.curr_amount === null ? 0 : user.curr_amount} CAD
                  </TableCell>
                  <TableCell>
                    <UserTypeBadge userType={user.user_type} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setShowWarning(user.user_id)}
                          disabled={user.deposit_status === "Received"}
                        >
                          Set as Received
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDepositStatusChange(
                              user.user_id,
                              group_id,
                              "Pending"
                            )
                          }
                          disabled={user.deposit_status === "Pending"}
                        >
                          Set as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDepositStatusChange(
                              user.user_id,
                              group_id,
                              "Returned"
                            )
                          }
                          disabled={user.deposit_status === "Returned"}
                        >
                          Set as Returned
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserTypeChange(
                              user.user_id,
                              group_id,
                              user.user_type === 0 ? 1 : 0
                            )
                          }
                        >
                          Change to {user.user_type === 0 ? "User" : "Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleKickOut(user.user_id, group_id)}
                        >
                          Kick Out User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {showWarning === user.user_id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-2">
                        <div className="flex items-center gap-2 text-amber-700 mb-2">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-semibold">Warning: Deposit Status Change</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-2">
                          This action  will set the deposit status to "Received" for {user.name}.
                          This will override the current deposit status and reset the deposit amount.
                        </p>
                        <p className="text-sm text-amber-700 mb-2">
                          Current amount: ${user.curr_amount === null ? 0 : user.curr_amount} CAD
                        </p>
                        <p className="text-sm text-amber-700 mb-4">
                          New amount: ${Number(user.init_amount || 0) - Number(user.init_deduction || 0)} CAD
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowWarning(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleDepositStatusChange(user.user_id, group_id, "Received")}
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}