'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { addEvent } from "@/lib/actions/event"
import { EVENTS } from "@/text/events"
import { PlusCircle, Calendar, Clock, Link, BookOpen } from "lucide-react"
import { useState } from "react"
import moment from "moment"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreateEventModal({ groupId }: { groupId: number }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState({
    name: 0,
    topic: 0,
    zoomlink: 0,
    assign1: 0,
    assign2: 0,
    assign3: 0,
  })

  const charLimits = {
    name: 20,
    topic: 20,
    zoomlink: 200,
    assignment: 100,
  }

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string | null
    const topic = formData.get("topic") as string | null
    const zoomlink = formData.get("zoomlink") as string | null
    const assign1 = formData.get("assign1") as string | null
    const assign2 = formData.get("assign2") as string | null
    const assign3 = formData.get("assign3") as string | null
    const date = formData.get("date") as string | null
    const time = formData.get("time") as string | null

    // Validate required fields
    if (!name || !topic || !date || !time) {
      setError("Please fill in all required fields.")
      return
    }

    // Validate character limits
    if (name.length > charLimits.name) {
      setError(`Event title must be less than ${charLimits.name} characters.`)
      return
    }
    if (topic.length > charLimits.topic) {
      setError(`Event description must be less than ${charLimits.topic} characters.`)
      return
    }
    if (zoomlink && zoomlink.length > charLimits.zoomlink) {
      setError(`Event link must be less than ${charLimits.zoomlink} characters.`)
      return
    }
    if (
      (assign1 && assign1.length > charLimits.assignment) ||
      (assign2 && assign2.length > charLimits.assignment) ||
      (assign3 && assign3.length > charLimits.assignment)
    ) {
      setError(`Assignments must be less than ${charLimits.assignment} characters each.`)
      return
    }

    const localDateTime = new Date(`${date}T${time}`)
    const utcDateTime = moment(localDateTime).utc().format()

    try {
      await addEvent({
        name,
        date: utcDateTime,
        topic,
        zoomlink: zoomlink || "",
        group_id: groupId,
        assign1: assign1 || "",
        assign2: assign2 || "",
        assign3: assign3 || "",
      })
      setError(null)
      setOpen(false)
    } catch (err) {
      setError("Failed to create event. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value
    setCharCount((prevCount) => ({
      ...prevCount,
      [field]: value.length,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> {EVENTS.CREATENEWEVENT}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{EVENTS.DIALOG_TITLE}</DialogTitle>
          <DialogDescription>{EVENTS.DIALOG_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          handleSubmit(formData)
        }}>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="datetime">Date & Time</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Event Title *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter event title"
                      maxLength={charLimits.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {charCount.name}/{charLimits.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Description *</Label>
                    <Textarea
                      id="topic"
                      name="topic"
                      placeholder="Describe your event"
                      maxLength={charLimits.topic}
                      onChange={(e) => handleInputChange(e, "topic")}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {charCount.topic}/{charLimits.topic}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zoomlink">Event Link</Label>
                    <Input
                      id="zoomlink"
                      name="zoomlink"
                      placeholder="https://..."
                      maxLength={charLimits.zoomlink}
                      onChange={(e) => handleInputChange(e, "zoomlink")}
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {charCount.zoomlink}/{charLimits.zoomlink}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="datetime">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assignments">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-2">
                      <Label htmlFor={`assign${num}`}>Assignment {num}</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`assign${num}`}
                          name={`assign${num}`}
                          placeholder={`Assignment ${num}`}
                          className="pl-10"
                          maxLength={charLimits.assignment}
                          onChange={(e) => handleInputChange(e, `assign${num}`)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-right">
                        {charCount[`assign${num}` as keyof typeof charCount]}/{charLimits.assignment}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="mt-6">
            <Button type="submit">{EVENTS.CREATE}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}