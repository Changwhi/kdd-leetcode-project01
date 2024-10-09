"use client";

import { Suspense, useEffect, useState } from "react";
import JoinButton from "@/components/link/join-button";
import { getGroup, getMyGroups } from "@/lib/actions/group";
import { getLoggedInUser } from "@/lib/actions/user";
import { useParams } from "next/navigation";

function decodeGroupId(encodedGroupId: string) {
  const base64 = encodedGroupId.replace(/-/g, "+").replace(/_/g, "/");
  return parseInt(Buffer.from(base64, "base64").toString("utf-8"), 10);
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinPageContent />
    </Suspense>
  );
}

function JoinPageContent() {
  const { group_id } = useParams();
  const groupId = decodeGroupId(group_id as string);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await getLoggedInUser();
      setCurrentUser(user);

      if (user) {
        const myGroups = await getMyGroups({ email: user.email });
        const memberStatus = myGroups.some(
          (group) => group.group_id === groupId
        );
        setIsMember(memberStatus);
      }

      const fetchedGroup = await getGroup({ group_id: groupId });
      setGroup(fetchedGroup);
    }

    fetchData();
  }, [groupId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <main className="max-w-2xl mx-auto text-center">
        {group ? <h1 className="text-6xl font-bold mb-6">{group.name}</h1> : ""}
        <h1 className="text-2xl font-bold mb-6">Join Our Community</h1>
        <p className="text-xl mb-8">
          Welcome to our vibrant community! We&apos;re excited to have you join
          us on this journey. Our platform offers a space for collaboration,
          learning, and growth. Whether you&apos;re a seasoned professional or
          just starting out, there&apos;s a place for you here.
        </p>
        {isMember ? (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            You are already a member
          </button>
        ) : (
          currentUser && <JoinButton user={currentUser} groupId={groupId} />
        )}
      </main>
    </div>
  );
}
