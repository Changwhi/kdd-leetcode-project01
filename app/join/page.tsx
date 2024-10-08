"use server";

import Header from "@/components/header";
import { getAllGroups, getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { getSession } from "@auth0/nextjs-auth0";
import Footer from "@/components/footer";
import { JoinComponent } from "@/components/join";
import { MyGroup, otherGroup } from "@/types/group";

/**
 * The join page, which displays a list of groups that the user is not a part of
 * and allows them to join them.
 *
 * @returns The join page.
 */
export default async function JoinPage() {
  const session = await getSession();
  const user = session?.user;
  const otherGroups: otherGroup[] | MyGroup[] = user
    ? await getOtherGroups({ email: user.email })
    : await getAllGroups();

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={user} />
        <main className="flex-1">
          <JoinComponent user={user} otherGroups={otherGroups} />
        </main>
        <Footer />
      </div>
    </>
  );
}
