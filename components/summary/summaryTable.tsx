"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpDown, Maximize2 } from "lucide-react"
import { Event, User } from "@/types/summary"

type SortConfig = {
  key: string
  direction: "ascending" | "descending"
  eventIndex?: number
}

export default function SummaryTable({usersInGroup}: {usersInGroup: User[]}) {
  const [users, setUsers] = useState<User[]>(usersInGroup)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [users, searchTerm])

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers]
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (sortConfig.key === "name") {
          return sortConfig.direction === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else {
          const aValue = a.events[sortConfig.eventIndex!][sortConfig.key as keyof Event]
          const bValue = b.events[sortConfig.eventIndex!][sortConfig.key as keyof Event]
          if (sortConfig.key === "pullRequest") {
            return sortConfig.direction === "ascending"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue)
          } else if (sortConfig.key === "assignment") {
            return sortConfig.direction === "ascending"
              ? (aValue as string[]).length - (bValue as string[]).length
              : (bValue as string[]).length - (aValue as string[]).length
          } else {
            return sortConfig.direction === "ascending"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue)
          }
        }
      })
    }
    return sortableUsers
  }, [filteredUsers, sortConfig])

  const requestSort = (key: string, eventIndex?: number) => {
    setSortConfig((prevConfig) => ({
      key,
      eventIndex,
      direction:
        prevConfig?.key === key && prevConfig?.eventIndex === eventIndex && prevConfig?.direction === "ascending"
          ? "descending"
          : "ascending",
    }))
  }

  const renderSortButton = (label: string, key: string, eventIndex?: number) => (
    <Button variant="ghost" onClick={() => requestSort(key, eventIndex)} className="ml-2">
      {label} <ArrowUpDown className="h-4 w-4 ml-1" />
    </Button>
  )

  const renderEventHeader = (eventIndex: number) => (
    <>
      <TableHead>{renderSortButton("Pull Request", "pullRequest", eventIndex)}</TableHead>
      <TableHead>{renderSortButton("Attendance", "attendance", eventIndex)}</TableHead>
      <TableHead>{renderSortButton("Assignment", "assignment", eventIndex)}</TableHead>
      <TableHead className="border-r-2 border-gray">{renderSortButton("Deposit (CAD)", "deposit", eventIndex)}</TableHead>
    </>
  )

  const renderEventData = (event: Event) => (
    <>
      <TableCell>{event.pullRequest ? "Submitted" : "Not Submitted"}</TableCell>
      <TableCell>
        {event.attendance === 0 ? "Absent" : event.attendance === 1 ? "Late" : "Attended"}
      </TableCell>
      <TableCell>{event.assignments.length === 0 ? "Not Submitted" : "Submitted"}</TableCell>
      <TableCell className="border-r-2 border-gray">{event.deposit}</TableCell>
    </>
  )

  const TableContent = () => (
  <>
      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 mt-6"
      />
      <Table>
        <TableHeader >
          <TableRow >
            <TableHead className="border-r-2 border-gray" colSpan={2}></TableHead>
            {users[0]?.events.map((_, index) => (
              <TableHead key={index} colSpan={4} className="text-center border-r-2 ">
                Event {index + 1}
              </TableHead>
            ))}
          </TableRow>
          <TableRow >
            <TableHead>
              {renderSortButton("Name", "name")}
            </TableHead>
            <TableHead className="border-r-2 border-gray">
              {renderSortButton("Total Deposit (CAD)", "totalDeposit")}
            </TableHead>
            {users[0]?.events.map((_, index) => renderEventHeader(index))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.user_id} className="">
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="border-r-2 border-gray">
                {user.events.reduce((sum, event) => sum + event.deposit, 0)}
              </TableCell>
              {user.events.map((event, index) => renderEventData(event))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )

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
          <DialogContent className="max-w-full overflow-y-auto">
            <TableContent />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <TableContent />
      </div>
    </div>
  )
}