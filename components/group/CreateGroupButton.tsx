"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createGroup } from "@/lib/actions/group";
import { GROUP } from "@/text/group";
import { PlusCircle, Users, DollarSign, Lock, Unlock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

export function CreateGroupButton({ email }: { email: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const charLimits = {
    name: 50,
    description: 50,
  };

  const initialFormData = {
    title: "",
    description: "",
    maxParticipants: "",
    totalDeposit: "",
    initialDeduction: "",
    prDeduction: "",
    attendanceDeduction: "",
    assignmentDeduction: "",
    private: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, private: checked }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value.toString());
    });
    try {
      await createGroup({
        formData: formDataToSubmit,
        email: email,
      });
      toast({
        title: "Success",
        description: "Group created successfully",
      });
      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {GROUP.CREATE_BUTTON}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {GROUP.GROUP_TITLE}
          </DialogTitle>
          <DialogDescription>{GROUP.GROUP_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter group title"
                      maxLength={charLimits.name}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.title.length}/{charLimits.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{GROUP.DESCRIPTION}</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your group"
                      maxLength={charLimits.description}
                      required
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {formData.description.length}/{charLimits.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">
                      {GROUP.MAX_PARTICIPANTS}
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="private"
                      checked={formData.private}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label
                      htmlFor="private"
                      className="flex items-center space-x-2"
                    >
                      {formData.private ? (
                        <>
                          <Lock className="h-4 w-4" />
                          <span>Private Group</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="h-4 w-4" />
                          <span>Public Group</span>
                        </>
                      )}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.private
                      ? "Private groups are only visible to invited members."
                      : "Public groups can be discovered and joined by anyone."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="financials">
              <Card className="max-h-[70vh] overflow-y-auto">
                <CardContent className="space-y-2 pt-4">
                  <div className="space-y-2 pb-5">
                    <Label
                      htmlFor="totalDeposit"
                      className="text-sm font-bold text-gray-700 pb-2"
                    >
                      {GROUP.TOTAL_DEPOSITS}
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="totalDeposit"
                        name="totalDeposit"
                        type="number"
                        value={formData.totalDeposit}
                        onChange={handleInputChange}
                        placeholder="e.g. 10"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-700">
                    {GROUP.DEPOSIT_DEDUCTIONS}
                  </h3>
                  <Card className="space-y-4">
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="initialDeduction">
                          {GROUP.INITIAL_DEDUCTION}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="initialDeduction"
                            name="initialDeduction"
                            type="number"
                            value={formData.initialDeduction}
                            onChange={handleInputChange}
                            placeholder="e.g. 10"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prDeduction">
                          {GROUP.PR_DEDUCTION}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="prDeduction"
                            name="prDeduction"
                            type="number"
                            value={formData.prDeduction}
                            onChange={handleInputChange}
                            placeholder="e.g. 10"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attendanceDeduction">
                          {GROUP.ATTENDANCE_DEDUCTION}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="attendanceDeduction"
                            name="attendanceDeduction"
                            type="number"
                            value={formData.attendanceDeduction}
                            onChange={handleInputChange}
                            placeholder="e.g. 10"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignmentDeduction">
                          {GROUP.ASSIGNMENT_DEDUCTION}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="assignmentDeduction"
                            name="assignmentDeduction"
                            type="number"
                            value={formData.assignmentDeduction}
                            onChange={handleInputChange}
                            placeholder="e.g. 10"
                            className="pl-10"
                            required
                          />
                        </div>
                        <p className="text-sm text-muted-foreground text-red-500">
                          Optional: If there are no assignments, set this to 0.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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
  );
}
