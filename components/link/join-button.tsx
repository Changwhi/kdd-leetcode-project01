"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { joinGroup } from "@/lib/actions/group";

export default function JoinButton({ user }: { user: any }) {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleJoin = async () => {
    setIsJoining(true);

    if (!user) {
      // Use router.push() for client-side navigation
      router.push(`/api/auth/login?returnTo=${encodeURIComponent("/link")}`);
      return null;
    } else {
      try {
        const join = await joinGroup({ email: user.email, group_id: 10 });
        setIsJoining(false);

        if (!join) {
          alert("Error joining group");
        } else {
          alert("Welcome to the community!");
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
