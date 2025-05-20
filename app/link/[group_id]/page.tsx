"use client";

import JoinButton from "@/components/link/join-button";
import { getGroup, getMyGroups } from "@/lib/actions/group";
import { getLoggedInUser } from "@/lib/actions/user";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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

/**
 * This component renders the content for the join page. It displays
 * the group name, a welcome message, and a button to join the group.
 * If the user is already a member, the button is disabled and a message
 * is displayed to indicate that they are already a member.
 *
 * @returns The join page content component.
 */
function JoinPageContent() {
  const { group_id: encodedGroupId } = useParams();
  const groupId = decodeGroupId(encodedGroupId as string);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [group, setGroup] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
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
      setIsLoading(false);
    }

    fetchData();
  }, [groupId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <main className="max-w-2xl mx-auto text-center">
        {isLoading ? (
          <Loader2 className="h-20 w-20 animate-spin" />
        ) : !!group ? (
          isMember ? (
            <MemberComponent group={group} />
          ) : (
            <NewerComponent
              encodedGroupdID={encodedGroupId as String}
              group={group}
              currentUser={currentUser}
              setIsMember={setIsMember}
            />
          )
        ) : (
          <WrongInvitationComponent />
        )}
      </main>
    </div>
  );
}

function NewerComponent({
  encodedGroupdID,
  group,
  currentUser,
  setIsMember,
}: {
  encodedGroupdID: String;
  group: any;
  currentUser: any;
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-6">{group.name}</h1>
      <h1 className="text-2xl font-bold mb-6">Join Our Community</h1>
      <p className="text-xl mb-8">
        Welcome to our vibrant community! We&apos;re excited to have you join us
        on this journey. Our platform offers a space for collaboration,
        learning, and growth. Whether you&apos;re a seasoned professional or
        just starting out, there&apos;s a place for you here.
      </p>
      <JoinButton
        user={currentUser}
        groupId={group.group_id}
        groupIdForLink={encodedGroupdID as string}
        onJoinSuccess={() => setIsMember(true)}
      />
    </>
  );
}

function MemberComponent({ group }: { group: any }) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-6">{group.name}</h1>
      <h1 className="text-xl mb-6">
        You are already a member of {group.name}. Let's explore study group
        dashboard and study together!
      </h1>
      <Link
        className="px-4 py-2 bg-gray-400 text-white rounded"
        href={`/dashboard/${group.group_id}`}
      >
        Go to dashboard
      </Link>
    </>
  );
}

function WrongInvitationComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-3xl font-bold">Wrong Invitation</h1>
      <p className="text-xl mt-4">
        The group you are trying to join does not exist.
      </p>
    </div>
  );
}
