"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { getLoggedInUser } from "@/lib/actions/user";
import { GroupCard } from "@/components/group/ui/groupCard";
import { getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { GROUP } from "@/text/group";
import { CreateGroupButton } from "@/components/group/CreateGroupButton";

/**
 * The group page, which displays a list of groups that the user is part of,
 * as well as a search bar to search for other groups.
 *
 * @returns The group page.
 */
export default async function Group() {
  const currentUser = await getLoggedInUser();
  if (!currentUser) {
    return <p>{GROUP.MUST_BE_LOGGED_IN}</p>
  }
  const otherGroups = await getOtherGroups({ email: currentUser.email });
  const myGroups = await getMyGroups({ email: currentUser.email });

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={currentUser} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="container mx-auto px-4 sm:px-36 ">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">{GROUP.MANAGE_GROUP}</h1>
                  <p className="text-muted-foreground">
                  {GROUP.GROUP_PAGE_SUB_TITLE}
                  </p>
                </div>
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{GROUP.YOUR_GROUP}</h2>
                    <CreateGroupButton email={currentUser.email} />
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {myGroups.map((group) => (
                      <GroupCard
                        email={currentUser.email}
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
                    <h2 className="text-2xl font-bold">{GROUP.JOIN_GROUP}</h2>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search groups..."
                        className="w-full max-w-md"
                      />
                      <Button variant="outline">{GROUP.SEARCH_BTUTTON}</Button>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {otherGroups.map((group) => (
                      <GroupCard
                        email={currentUser.email}
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
