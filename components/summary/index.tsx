import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { CONSTANTS } from "@/text/summary"; 

export const Summary = () => {
  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{CONSTANTS.TITLE}</h1>
            <p className="text-muted-foreground">{CONSTANTS.DATE}</p>
          </div>
          <Button variant="ghost" size="icon">
            <ExpandIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">{CONSTANTS.NAME}</th>
                <th className="px-4 py-2 text-left">{CONSTANTS.EMAIL}</th>
                <th className="px-4 py-2 text-left">{CONSTANTS.LEVEL}</th>
                <th className="px-4 py-2 text-left">{CONSTANTS.DEPOSIT}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">{CONSTANTS.STUDENT_NAME}</td>
                <td className="px-4 py-2">{CONSTANTS.STUDENT_EMAIL}</td>
                <td className="px-4 py-2">{CONSTANTS.STUDENT_LEVEL}</td>
                <td className="px-4 py-2">
                  <div className="w-24 h-2 bg-blue-500 rounded-full" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">{CONSTANTS.ASSIGNMENTS_TITLE}</h2>
          <div className="space-y-4 mt-4">
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">
                  {CONSTANTS.ASSIGNMENT_1}
                </h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">
                  {CONSTANTS.ASSIGNMENT_1}
                </h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
            <Card className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-sm font-semibold">
                  {CONSTANTS.ASSIGNMENT_2}
                </h3>
              </div>
              <Button variant="outline" size="sm">
                Link
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <aside className="basis-1/4 w-1/2 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <div className="mb-6 w-full">
          <Calendar mode="single" className="border rounded-md" />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold">{CONSTANTS.UPCOMING_EVENTS_TITLE}</h2>
          <div className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="text-sm font-semibold">
                {CONSTANTS.EVENT_1_TITLE}
              </h3>
              <p className="text-muted-foreground">
                {CONSTANTS.EVENT_1_DATE}
              </p>
              <Link href="#" className="text-blue-500" prefetch={false}>
                {CONSTANTS.SEE_PROJECT_DETAILS}
              </Link>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-semibold">
                {CONSTANTS.EVENT_2_TITLE}
              </h3>
              <p className="text-muted-foreground">
                {CONSTANTS.EVENT_2_DATE}
              </p>
              <Link href="#" className="text-blue-500" prefetch={false}>
                {CONSTANTS.SEE_PROJECT_DETAILS}
              </Link>
            </Card>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-bold">{CONSTANTS.CHOOSE_DATE_TITLE}</h2>
          <p className="text-muted-foreground">
            {CONSTANTS.CHOOSE_DATE_DESCRIPTION}
          </p>
          <Button variant="default" className="mt-4">
            {CONSTANTS.VIEW_TIPS_BUTTON}
          </Button>
        </div>
      </aside>
    </div>
  );
};

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
  );
}
