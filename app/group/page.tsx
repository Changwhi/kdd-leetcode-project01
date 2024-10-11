"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { getLoggedInUser } from "@/lib/actions/user";
import { GroupCard } from "@/components/group/ui/groupCard";
import { getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { GROUP } from "@/text/group";
import { CreateGroupButton } from "@/components/group/CreateGroupButton";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import Footer from "@/components/footer";

/**
 * The group page, which displays a list of groups that the user is part of,
 * as well as a search bar to search for other groups.
 *
 * @returns The group page.
 */
export default async function Group() {
  const currentUser = await getLoggedInUser();
  if (!currentUser) {
    redirect("/api/auth/login"); // Redirect to login if user is not logged in
    return null; // Important to return null after redirect
  }
  const myGroups = await getMyGroups({ email: currentUser.email });
  const adminGroups = myGroups.filter((group) => group.user_type === 0);
  const memberGroups = myGroups.filter((group) => group.user_type === 1);

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={currentUser} />
        <main className="flex-1">
          <section className="w-full py-12 lg:py-20 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="container mx-auto px-4 sm:px-36 ">
                <div className="flex items-center justify-between mb-4">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                      {GROUP.CHECK_OUT_GROUP}
                    </h1>
                    <p className="text-muted-foreground">
                      {GROUP.GROUP_PAGE_SUB_TITLE}
                    </p>
                  </div>

                  <CreateGroupButton email={currentUser.email} />
                </div>

                {adminGroups.length > 0 && (<div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    {GROUP.ADMIN_GROUP}
                  </h2>
                  <div className="flex flex-row flex-wrap gap-6">
                    {adminGroups.map((group) => (
                      <GroupCard
                        email={currentUser.email}
                        isMyCard={true}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                  </div>
                </div>)}
                {memberGroups.length > 0 && (<div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      {GROUP.MEMBER_GROUP}
                    </h2>
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {memberGroups.map((group) => (
                      <GroupCard
                        email={currentUser.email}
                        isMyCard={true}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                  </div>
                </div>)}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
