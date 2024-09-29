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
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    zoomlink: '',
    assign1: '',
    assign2: '',
    assign3: '',
    date: '',
    time: ''
  })

  const charLimits = {
    name: 20,
    topic: 20,
    zoomlink: 200,
    assignment: 100,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, topic, zoomlink, assign1, assign2, assign3, date, time } = formData

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
      setFormData({
        name: '',
        topic: '',
        zoomlink: '',
        assign1: '',
        assign2: '',
        assign3: '',
        date: '',
        time: ''
      })
    } catch (err) {
      setError("Failed to create event. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        <form onSubmit={handleSubmit}>
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
                      value={formData.name}
                      placeholder="Enter event title"
                      maxLength={charLimits.name}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.name.length}/{charLimits.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Description *</Label>
                    <Textarea
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      placeholder="Describe your event"
                      maxLength={charLimits.topic}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.topic.length}/{charLimits.topic}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zoomlink">Event Link</Label>
                    <Input
                      id="zoomlink"
                      name="zoomlink"
                      value={formData.zoomlink}
                      placeholder="https://..."
                      maxLength={charLimits.zoomlink}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.zoomlink.length}/{charLimits.zoomlink}
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
                        value={formData.date}
                        className="pl-10"
                        onChange={handleInputChange}
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
                        value={formData.time}
                        className="pl-10"
                        onChange={handleInputChange}
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
                          value={formData[`assign${num}` as keyof typeof formData]}
                          placeholder={`Assignment ${num}`}
                          className="pl-10"
                          maxLength={charLimits.assignment}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-right">
                        {formData[`assign${num}` as keyof typeof formData].length}/{charLimits.assignment}
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