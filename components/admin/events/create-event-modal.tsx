"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addEvent } from "@/lib/actions/event";
import { EVENTS } from "@/text/events";
import {
  PlusCircle,
  Calendar,
  Clock,
  Link,
  BookOpen,
  CirclePlus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import moment from "moment";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export function CreateEventModal({ groupId }: { groupId: number }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    zoomlink: "",
    assign: ["", "", ""],
    date: "",
    time: "",
  });

  const charLimits = {
    name: 20,
    topic: 20,
    zoomlink: 200,
    assignment: 200,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, topic, zoomlink, assign, date, time } = formData;

    // Validate required fields
    if (!name || !topic || !date || !time) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate character limits
    if (name.length > charLimits.name) {
      setError(`Event title must be less than ${charLimits.name} characters.`);
      return;
    }
    if (topic.length > charLimits.topic) {
      setError(
        `Event description must be less than ${charLimits.topic} characters.`
      );
      return;
    }
    if (zoomlink && zoomlink.length > charLimits.zoomlink) {
      setError(
        `Event link must be less than ${charLimits.zoomlink} characters.`
      );
      return;
    }

    if (
      assign.some((assign) => assign && assign.length > charLimits.assignment)
    ) {
      setError(
        `Assignments must be less than ${charLimits.assignment} characters each.`
      );
      return;
    }

    const localDateTime = new Date(`${date}T${time}`);
    const utcDateTime = moment(localDateTime).utc().format();

    try {
      const response = await addEvent({
        name,
        date: utcDateTime,
        topic,
        zoomlink: zoomlink || "",
        group_id: groupId,
        assign,
      });
      setError(null);
      setOpen(false);
      setFormData({
        name: "",
        topic: "",
        zoomlink: "",
        assign: ["", "", ""],
        date: "",
        time: "",
      });
      if (!response) {
        toast({
          description: "Failed to create event. Please try again.",
        });
      }
    } catch (err) {
      setError("Failed to create event. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updatedAssign = [...prev.assign];
      updatedAssign[index] = value;
      return { ...prev, assign: updatedAssign };
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> {EVENTS.CREATENEWEVENT}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {EVENTS.DIALOG_TITLE}
          </DialogTitle>
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
                  {formData.assign.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`assign${index + 1}`}>
                        Assignment {index + 1}
                      </Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <div className="flex">
                          <Input
                            id={`assign${index + 1}`}
                            name={`assign${index + 1}`}
                            value={formData.assign[index]}
                            placeholder={`Assignment ${index + 1}`}
                            className="pl-10"
                            maxLength={charLimits.assignment}
                            onChange={(e) => handleAssignInputChange(e, index)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => {
                                const updatedAssign = [...prev.assign];
                                updatedAssign.splice(index, 1);
                                return { ...prev, assign: updatedAssign };
                              });
                            }}
                          >
                            <Trash2 className="w-5 h-5 ml-2" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-right">
                        {formData.assign[index]?.length || 0}/
                        {charLimits.assignment}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => {
                          const updatedAssign = [...prev.assign];
                          updatedAssign.push("");
                          return { ...prev, assign: updatedAssign };
                        });
                      }}
                    >
                      <CirclePlus />
                    </button>
                  </div>
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
  );
}
