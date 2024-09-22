"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GROUP } from "@/text/group";
import { getAllMemberInGroup, joinGroup } from "@/lib/actions/group";
import { useEffect, useState } from "react";
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
/**
 * A card that displays a group's information, with a button to join the group if the user is not already part of it.
 *
 * @param email - The email of the user to join the group.
 * @param name - The name of the group.
 * @param description - The description of the group.
 * @param group_id - The id of the group.
 * @param isMyCard - If the card is for the user's own group.
 */

export const GroupCard = ({
  email,
  name,
  description,
  group_id,
  isMyCard = false,
}: {
  email: string;
  name: string;
  description: string;
  group_id: number;
  isMyCard: boolean;
}) => {
  const [numberOfMembers, setNumberOfMembers] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getAllMemberInGroup({ group_id });
      setNumberOfMembers(members.length);
    };

    fetchMembers();
  }, []);
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            {name}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {numberOfMembers} {GROUP.MEMBERS}
            </span>
          </div>
          {isMyCard && (
            <Button variant="outline" size="sm">
              <a href={`/dashboard/${group_id}/summary`}>
                {GROUP.GOTO}
              </a>
            </Button>
          )}
          {!isMyCard && (
            <Dialog>
              <DialogTrigger asChild>
                {email && (
                  <Button variant="ghost" size={"sm"}>
                    {GROUP.JOIN}
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{GROUP.JOIN_TITLE}</DialogTitle>
                  <DialogDescription>
                    {GROUP.JOIN_DESCRIPTION}
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="space-y-4"
                  action={async (formData: FormData) => {
                    await joinGroup({ group_id: group_id, email: email });
                  }}
                >
                  <DialogClose asChild>
                    <DialogFooter>
                      <Button type="submit">{GROUP.JOIN}</Button>
                    </DialogFooter>
                  </DialogClose>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
