"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GROUP } from "@/text/group";
import { UserType } from "@/types/user";
import { getAllMemberInGroup } from "@/lib/actions/group";
import { useEffect, useState } from "react";

export const GroupCard = ({
  isOwner,
  name,
  description,
  group_id,
  isMyCard = false,
}: {
  isOwner: number;
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
          <h3 className="text-xl font-semibold">{name} {isOwner === 0 ? "(admin)":"(user)"}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {numberOfMembers} {GROUP.MEMBERS}
            </span>
          </div>
          {isMyCard && (
            <Button variant="outline" size="sm">
              {GROUP.GOTO}
            </Button>
          )}
          {!isMyCard && (
            <Button variant="outline" size="sm">
              {GROUP.JOIN}
            </Button>
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
