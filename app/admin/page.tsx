import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"

export default function Admin() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 bg-black text-white p-6">
        <div className="flex flex-col items-center">
          <Avatar className="relative">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>CS</AvatarFallback>
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              4
            </div>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">Chul Su</h2>
          <p className="text-muted-foreground">User</p>
          <p className="text-muted-foreground">samantha@email.com</p>
        </div>
        <nav className="mt-8 space-y-4">
          <a href="#" className="block text-lg font-semibold">
            Summary
          </a>
          <a href="#" className="block text-lg text-muted-foreground">
            Attend an event
          </a>
          <a href="#" className="block text-lg text-muted-foreground">
            Assignment
          </a>
          <a href="#" className="block text-lg text-muted-foreground">
            Status
          </a>
          <a href="#" className="block text-lg text-muted-foreground opacity-50 cursor-not-allowed">
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Week 8 – Online Mock Interview</h1>
            <p className="text-muted-foreground">April 11, 2024</p>
          </div>
          <Button variant="ghost" size="icon">
            <ExpandIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Deposit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Chul Su</td>
                <td className="px-4 py-2">ChulSu@abc.com</td>
                <td className="px-4 py-2">Novice</td>
                <td className="px-4 py-2">
                  <div className="w-24 h-2 bg-blue-500 rounded-full" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Assignments</h2>
          <div className="space-y-4 mt-4">
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">417. Pacific Atlantic Water Flow</h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">417. Pacific Atlantic Water Flow</h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">Individual</h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <aside className="w-1/4 bg-white p-6">
        <div className="mb-6">
          <Calendar mode="single" className="border rounded-md" />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold">Upcoming Events</h2>
          <div className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="text-sm font-semibold">Week 2 – Online Mock Interview</h3>
              <p className="text-muted-foreground">April 04, 2024</p>
              <Link href="#" className="text-blue-500" prefetch={false}>
                See project details
              </Link>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-semibold">Week 3 – Online Mock Interview</h3>
              <p className="text-muted-foreground">April 11, 2024</p>
              <Link href="#" className="text-blue-500" prefetch={false}>
                See project details
              </Link>
            </Card>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-bold">Choose date</h2>
          <p className="text-muted-foreground">You can see all details based on a date</p>
          <Button variant="default" className="mt-4">
            View Tips
          </Button>
        </div>
      </aside>
    </div>
  )
}

function ExpandIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  )
}