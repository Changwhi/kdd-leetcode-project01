"use client";

import { useState, useMemo } from "react";
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Users,
  Mail,
  Filter,
  ArrowUpDown,
} from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceType } from "@/types/attendance";
import { setDepositStatus, setUserType } from "@/lib/actions/user";
import { useToast } from "@/components/ui/use-toast";

type DepositStatus = "Received" | "Pending" | "Returned";
type UserType = 0 | 1;

interface User {
  user_id: number;
  name: string;
  email: string;
  deposit_status: DepositStatus;
  avatar: string;
  curr_amount: number;
  user_type: UserType;
}

type SortField =
  | "name"
  | "email"
  | "deposit_status"
  | "curr_amount"
  | "user_type";
type SortOrder = "asc" | "desc";

export default function UserTable({
  usersInGroup,
}: {
  usersInGroup: AttendanceType[];
}) {
  const [users, setUsers] = useState<AttendanceType[]>(
    usersInGroup.map((user) => ({
      ...user,
      deposit_status: user.deposit_status || "Pending",
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
            ? { ...user, deposit_status: newStatus }
            : user
        )
      );
      toast({
        title: "Success",
        description: "Deposit status updated successfully.",
        variant: "default",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update deposit status.",
        variant: "destructive",
      });
    }
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
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update user type.",
        variant: "destructive",
      });
    }
  };

  const handleKickOut = (userId: number) => {
    setUsers(users.filter((user) => user.user_id !== userId));
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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.order === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
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
                  {/* <SortIcon field="name" /> */}
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
                  {/* <SortIcon field="email" /> */}
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
                  {/* <SortIcon field="deposit_status" /> */}
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
                  {/* <SortIcon field="curr_amount" /> */}
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
                  {/* <SortIcon field="user_type" /> */}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
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
                <TableCell>${user.curr_amount} CAD</TableCell>
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
                        onClick={() =>
                          handleDepositStatusChange(
                            user.user_id,
                            user.group_id,
                            "Received"
                          )
                        }
                      >
                        Set as Received
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleDepositStatusChange(
                            user.user_id,
                            user.group_id,
                            "Pending"
                          )
                        }
                      >
                        Set as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleDepositStatusChange(
                            user.user_id,
                            user.group_id,
                            "Returned"
                          )
                        }
                      >
                        Set as Returned
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleUserTypeChange(
                            user.user_id,
                            user.group_id,
                            user.user_type === 0 ? 1 : 0
                          )
                        }
                      >
                        Change to {user.user_type === 0 ? "User" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Kick Out User
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove the user from the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleKickOut(user.user_id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
