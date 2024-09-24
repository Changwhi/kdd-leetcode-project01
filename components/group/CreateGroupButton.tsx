"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createGroup } from "@/lib/actions/group"
import { GROUP } from "@/text/group"
import { PlusCircle, Users, DollarSign, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreateGroupButton({ email }: { email: string }) {
  const charLimits = {
    name: 50,
    description: 50,
  }

  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {GROUP.CREATE_BUTTON}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{GROUP.GROUP_TITLE}</DialogTitle>
          <DialogDescription>{GROUP.GROUP_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-6"
          action={async (formData: FormData) => {
            await createGroup({
              formData: formData,
              email: email,
            })
          }}
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Group Details</TabsTrigger>
              <TabsTrigger value="financials">Financial Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{GROUP.TITLE}</Label>
                    <Input
                      id="title"
                      name="title"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Enter group title"
                      maxLength={charLimits.name}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {groupName.length}/{charLimits.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{GROUP.DESCRIPTION}</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      placeholder="Describe your group"
                      maxLength={charLimits.description}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {groupDescription.length}/{charLimits.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">{GROUP.MAX_PARTICIPANTS}</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="financials">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalDeposit">{GROUP.TOTAL_DEPOSITS}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="totalDeposit"
                        name="totalDeposit"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialDeduction">{GROUP.INITIAL_DEDUCTION}</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="initialDeduction"
                        name="initialDeduction"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendanceDeduction">{GROUP.ATTENDANCE_DEDUCTION}</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="attendanceDeduction"
                        name="attendanceDeduction"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignmentDeduction">{GROUP.ASSIGNMENT_DEDUCTION}</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="assignmentDeduction"
                        name="assignmentDeduction"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prDeduction">{GROUP.PR_DEDUCTION}</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="prDeduction"
                        name="prDeduction"
                        type="number"
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {GROUP.CREATE}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}