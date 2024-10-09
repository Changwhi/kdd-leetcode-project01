"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinGroup } from "@/lib/actions/group";

export default function JoinButton({
  user,
  groupId,
  groupIdForLink,
  onJoinSuccess,
}: {
  user: any;
  groupId: number;
  groupIdForLink: string;
  onJoinSuccess: () => void;
}) {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleJoin = async () => {
    setIsJoining(true);

    if (!user) {
      router.push(
        `/api/auth/login?returnTo=${encodeURIComponent(`/link/${groupIdForLink}`)}`
      );
      return;
    } else {
      try {
        const join = await joinGroup({ email: user.email, group_id: groupId });
        setIsJoining(false);

        if (!join) {
          alert("Error joining group");
        } else {
          alert("Welcome to the community!");
          onJoinSuccess();
        }
      } catch (error) {
        setIsJoining(false);
        alert("An error occurred while joining the group.");
        console.error(error);
      }
    }
  };

  return (
    <Button
      onClick={handleJoin}
      disabled={isJoining}
      className="w-full sm:w-auto"
    >
      {isJoining ? "Joining..." : "Join Now"}
    </Button>
  );
}
