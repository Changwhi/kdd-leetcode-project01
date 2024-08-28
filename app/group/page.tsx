"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { getLoggedInUser } from "@/lib/actions/user";
import { GroupCard } from "@/components/group/groupCard.tsx/groupCard";
import { createGroup, getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user";
import { GroupType, MyGroup, otherGroup } from "@/types/group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GROUP } from "@/text/group";

export default function Group() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>({
    user_id: 0,
    name: "",
    email: "",
  });
  const [myGroups, setMyGroups] = useState<MyGroup[]>([]);
  const [otherGroups, setOtherGroups] = useState<otherGroup[]>([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setCurrentUser({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        });
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMyGroups = async () => {
      const myGroupsData = await getMyGroups({ email: currentUser.email });
      setMyGroups(myGroupsData);
    };
    const fetchOtherGroups = async () => {
      const otherGroups = await getOtherGroups({ email: currentUser.email });
      setOtherGroups(otherGroups);
    };
    fetchOtherGroups();
    fetchMyGroups();
  }, [currentUser]);

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={currentUser} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="container mx-auto px-4 sm:px-36 ">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Manage Groups</h1>
                  <p className="text-muted-foreground">
                    Create, join, and manage your groups.
                  </p>
                </div>
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Your Groups</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>{GROUP.CREATE_BUTTON}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{GROUP.GROUP_TITLE}</DialogTitle>
                          <DialogDescription>
                            {GROUP.GROUP_DESCRIPTION}
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          className="space-y-4"
                          action={async (formData: FormData) => {
                            await createGroup({
                              formData: formData,
                              email: currentUser.email,
                            });
                          }}
                        >
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="title" className="text-right">
                                {GROUP.TITLE}
                              </Label>
                              <Input
                                id="title"
                                className="col-span-3"
                                name="title"
                                placeholder="Group Title"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="description"
                                className="text-right"
                              >
                                {GROUP.DESCRIPTION}
                              </Label>
                              <Input
                                id="description"
                                name="description"
                                className="col-span-3"
                                placeholder="Group Description"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="maxParticipants"
                                className="text-right"
                              >
                                {GROUP.MAX_PARTICIPANTS}
                              </Label>
                              <Input
                                id="topic"
                                className="col-span-3"
                                name="maxParticipants"
                                placeholder="e.g. 10 (participants)"
                                type="number"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="attendanceDeduction"
                                className="text-right"
                              >
                                {GROUP.ATTENDANCE_DEDUCTION}
                              </Label>
                              <Input
                                id="zoomlink"
                                className="col-span-3"
                                name="attendanceDeduction"
                                type="number"
                                placeholder="e.g. 10 (CAD 10)"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="assginmentDeduction"
                                className="text-right"
                              >
                                {GROUP.ASSIGNMENT_DEDUCTION}
                              </Label>
                              <Input
                                id="assign1"
                                className="col-span-3"
                                name="assginmentDeduction"
                                placeholder="e.g. 10 (CAD 10)"
                                type="number"
                                required
                              />
                            </div>
                          </div>

                          <DialogClose asChild>
                            <DialogFooter>
                              <Button type="submit">{GROUP.CREATE}</Button>
                            </DialogFooter>
                          </DialogClose>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {myGroups.map((group) => (
                      <GroupCard
                        isOwner={group.user_type}
                        isMyCard={true}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Join a Group</h2>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search groups..."
                        className="w-full max-w-md"
                      />
                      <Button variant="outline">Browse</Button>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {otherGroups.map((group) => (
                      <GroupCard
                        isOwner={group.user_type}
                        isMyCard={false}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
